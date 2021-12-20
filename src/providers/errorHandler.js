const wrapper = require('./wrapper');
const crypto = require('crypto');

module.exports = (err, res) => {
    console.error(err);
    if (res && !res.headersSent) res.status(500).json(wrapper({
        msg: `Error`,
        code: crypto.randomBytes(32).toString('base64'),
    }, {}, 'error'));
}
