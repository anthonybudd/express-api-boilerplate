const { Group } = require('./../../models');

module.exports = async (req, res, next) => {
    const groupID = (req.params.groupID || req.body.groupID);

    const group = await Group.findByPk(groupID);

    if (group.ownerID === req.user.id) {
        return next()
    } else {
        return res.status(401).send(`Error 55213: You are not the owner of this group ${groupID}`);
    }
}