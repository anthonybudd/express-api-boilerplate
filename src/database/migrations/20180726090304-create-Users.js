module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        password: Sequelize.STRING,

        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,            
        tos: Sequelize.STRING,

        lastLoginAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
