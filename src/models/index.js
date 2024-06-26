const User = require('./User');
const Group = require('./Group');
const GroupsUsers = require('./GroupsUsers');


User.belongsToMany(Group, {
    through: GroupsUsers,
    foreignKey: 'userID',
    otherKey: 'groupID',
});
Group.belongsToMany(User, {
    through: GroupsUsers,
    foreignKey: 'groupID',
    otherKey: 'userID',
});


module.exports = {
    User,
    Group,
    GroupsUsers,
};
