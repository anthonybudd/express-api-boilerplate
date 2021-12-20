const Sequelize = require('sequelize');
const db = require('./../providers/db');

module.exports = db.define('GroupsUsers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    userID: Sequelize.UUID,
    groupID: Sequelize.UUID,
}, {
    tableName: 'GroupsUsers',
});
