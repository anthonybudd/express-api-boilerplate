const Sequelize = require('sequelize');
const db = require('./../providers/db');

module.exports = db.define('User', {
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
    passwordResetKey: Sequelize.STRING,

    lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Users',
    defaultScope: {
        attributes: {
            exclude: [
                'password',
                'passwordResetKey',
            ]
        }
    },
});
