const Sequelize = require('sequelize');
const db = require('./../providers/db');

module.exports = db.define('GroupsUsers', {
    userID: Sequelize.UUID,
    groupID: Sequelize.UUID,
}, {
    tableName: 'GroupsUsers',
    updatedAt: false,
});
