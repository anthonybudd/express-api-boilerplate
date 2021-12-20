const crypto = require('crypto');

module.exports = (err, res) => {
    console.error(err);
    if (res && !res.headersSent) res.status(500).send('Error ' + crypto.randomBytes(32).toString('base64'));
}
