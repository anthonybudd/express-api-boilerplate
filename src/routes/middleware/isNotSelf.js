const wrapper = require('./../../providers/wrapper');

module.exports = (req, res, next) => {

    if (!req.user || !req.user.id) return res.status(401).json(wrapper({
        msg: `Access error`,
        code: 18196,
    }, {}, 'error'));

    if (req.user.id !== req.body.userID) {
        return next()
    } else {
        return res.status(401).json(wrapper({
            msg: `Access error`,
            code: 18196,
        }, {}, 'error'));
    }
}