const { body, validationResult, matchedData } = require('express-validator');
const { User, Group, GroupsUsers } = require('./../models');
const errorHandler = require('./../providers/errorHandler');
const generateJWT = require('./../providers/generateJWT');
const wrapper = require('./../providers/wrapper');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const express = require('express');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

const app = (module.exports = express.Router());


/**
 * GET /api/v1/_authcheck
 * 
 * Helper route for testing auth status
 */
app.get('/_authcheck', [
    passport.authenticate('jwt', { session: false })
], (req, res) => res.json(wrapper({
    auth: true,
    id: req.user.id,
})));


/**
 * POST api/v1/auth/login
 * 
 * Login
 */
app.post('/auth/login', [
    body('email').exists(),
    body('password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) return errorHandler(err, res)
        if (!user) return res.status(401).json('Incorrect email or password');

        req.login(user, { session: false }, (err) => {
            if (err) return errorHandler(err, res)

            res.json(wrapper({
                accessToken: generateJWT(user)
            }));

            User.update({
                lastLoginAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            }, {
                where: {
                    id: user.id
                }
            })
        });
    })(req, res);
});


/**
 * POST /api/v1/auth/sign-up
 * 
 */
app.post('/auth/sign-up', [
    body('email', 'You must provide your email address').exists({ checkFalsy: true }).isEmail(),
    body('password', 'Your password must be atleast 7 characters long').isLength({ min: 7 }),

    // If user supplies an email and password that already exists, just attempt login.
    async (req, res, next) => {
        try {
            const { email } = matchedData(req);
            if (!email) return next();

            const users = User.findAll({ where: { email } })
            if (users.length !== 1) return next(); // Email does not exist, don't attempt a login

            return passport.authenticate('local', { session: false }, (err, user) => {
                if (err) return errorHandler(err, res);
                if (!user) return next(); // Invalid login, Continue with sign-up attempt
                
                req.login(user, { session: false }, async (err) => {
                    if (err) return errorHandler(err, res);

                    res.json(wrapper({
                        accessToken: generateJWT(user),
                        userAlreadyHasAnAccount: true,
                    }));

                    await User.update({
                        lastLoginAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                    }, {
                        where: {
                            id: user.id
                        }
                    });
                });
                
            })(req, res);
        } catch (error) {
            return errorHandler(error, res)
        }
    },
    body('email', 'This email address is taken').custom(async (email) => {
        const user = await User.findOne({
            where: { email },
        });
        
        if (user) throw new Error('This email address is taken');
    }),
    body('firstName', 'You must provide your first name').exists(),
    body('lastName'),
    body('groupName'),
    body('tos', 'You must accept the Terms of Service to use this platform').exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
        const data = matchedData(req);

        const userID = uuidv4();
        const groupID = uuidv4();
        const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
        if (!data.lastName) data.lastName = '';
        if (!data.groupName) data.groupName = data.firstName.concat("'s Team");

        await Group.create({
            id: groupID,
            name: data.groupName,
            ownerID: userID,
        })

        await GroupsUsers.create({ userID, groupID });

        await User.create({
            id: userID,
            email: data.email.toLowerCase(),
            password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
            firstName: ucFirst(data.firstName),
            lastName: ucFirst(data.lastName),
            lastLoginAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            tos: data.tos
        })

        return passport.authenticate('local', { session: false }, (err, user) => {
            if (err) return errorHandler(err, res);
            req.login(user, { session: false }, (err) => {
                if (err) return errorHandler(err, res);
                res.json(wrapper({
                    accessToken: generateJWT(user)
                }));
            });
        })(req, res);
    } catch (error) {
        return errorHandler(error, res)
    }
});
