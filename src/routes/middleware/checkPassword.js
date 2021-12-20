const errorHandler = require('./../../providers/errorHandler');
const wrapper = require('./../../providers/wrapper');
const { User } = require('./../../models');
const bcrypt = require('bcrypt-nodejs');

module.exports = (req, res, next) => {

    if (!req.body.password) return res.status(422).json({
        errors: {
            components: {
                location: "body",
                param: "password",
                msg: "Password must be provided"
            }
        }
    });

    User.unscoped().findOne({ where: { id: req.user.id } }).then(user => {
        if (!user) return res.status(401).json(wrapper({
            msg: 'Incorrect password',
            code: 92294,
        }, {}, 'error'));

        bcrypt.compare(req.body.password, user.password, (err, compare) => {
            if (err) return res.status(401).json(wrapper({
                msg: 'Incorrect password',
                code: 96294,
            }, {}, 'error'));

            if (compare) {
                return next();
            } else {
                return res.status(401).json(wrapper({
                    msg: 'Incorrect password',
                    code: 92298,
                }, {}, 'error'));
            }
        });
    }).catch(err => errorHandler(err, res));
}
