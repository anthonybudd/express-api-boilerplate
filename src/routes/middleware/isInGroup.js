const { User, Group } = require('./../../models');

module.exports = async (req, res, next) => {
    const groupID = (req.params.groupID || req.body.groupID);

    const user = await User.findByPk(req.user.id, {
        include: [ Group ],
    });

    const groups = user.Groups.map(({ id }) => (id));

    if (Array.isArray(groups) && groups.includes(groupID)) {
        return next();
    } else {
        return res.status(401).send(`Error 65196: You do not have access to group ${groupID} in [${groups.join(', ')}]`);
    }
}