module.exports = (req, res, next) => {

    if (!req.user || !req.user.id) return res.status(401).send('Unauthorised');

    if (req.user.id !== req.body.userID) {
        return next()
    } else {
        return res.status(401).send('Error 18196: Access error');
    }
}