const Sequelize = require('sequelize');
const db = require('./../providers/db');

module.exports = db.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },

    email: Sequelize.STRING,
    password: Sequelize.STRING,

    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    tos: Sequelize.STRING,

    lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Users',
    paranoid: true,
    defaultScope: {
        attributes: {
            exclude: [
                'password',
            ]
        }
    },
});
