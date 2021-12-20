const { body, validationResult, matchedData } = require('express-validator');
const { User, Group, GroupsUsers } = require('./../models');
const errorHandler = require('./../providers/errorHandler');
const wrapper = require('./../providers/wrapper');
const middleware = require('./middleware');
const passport = require('passport');
const express = require('express');

const app = (module.exports = express.Router());


/**
 * GET /api/v1/groups/:groupID
 *
 */
app.get('/groups/:groupID', [
    passport.authenticate('jwt', { session: false }),
    middleware.isInGroup,
], async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.groupID, {
            include: (req.query.with === 'users')? [ User ] : [],
        });

        return res.json(wrapper(group));
    } catch (error) {
        return errorHandler(error, res);
    }
});


/**
 * POST /api/v1/groups/:groupID
 *
 */
app.post('/groups/:groupID', [
    passport.authenticate('jwt', { session: false }),
    middleware.isInGroup,
    body('name')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
        const data = matchedData(req);

        await Group.update(data, {
            where: {
                id: req.params.groupID
            }
        });

        return res.json(wrapper(
            await Group.findByPk(req.params.groupID)
        ));
    } catch (error) {
        return errorHandler(error, res);
    }
});


/**
 * POST /api/v1/groups/:groupID/users/add
 *
 */
app.post('/groups/:groupID/users/add', [
    passport.authenticate('jwt', { session: false }),
    middleware.isGroupOwner,
    middleware.isNotSelf,
    body('userID').exists(),
    body('userID', 'This user ID does not exist').custom(async function (id) {
        const user = await User.findAll({
            where: { id },
            limit: 1,
        });
        return (user.length === 1);
    }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
        const data = matchedData(req);

        // Delete all first
        await GroupsUsers.destroy({
            where: {
                groupID: req.params.groupID,
                userID: data.userID
            }
        })

        await GroupsUsers.create({
            groupID: req.params.groupID,
            userID: data.userID,
        })

        return res.json(wrapper({ id: data.userID }))
    } catch (error) {
        return errorHandler(error, res);
    }
});


/**
 * DELETE /api/v1/groups/:groupID/users/:userID
 *
 */
app.delete('/groups/:groupID/users/:userID', [
    passport.authenticate('jwt', { session: false }),
    middleware.isGroupOwner,
    middleware.isNotSelf,
], async (req, res) => {

    await GroupsUsers.destroy({
        where: {
            groupID: req.params.groupID,
            userID: req.params.userID,
        }
    })
    
    return res.send(wrapper({ id: req.params.userID }))
});
