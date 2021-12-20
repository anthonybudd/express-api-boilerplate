module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('GroupsUsers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        groupID:   Sequelize.UUID,
        userID:    Sequelize.UUID,

        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('GroupsUsers'),
};