module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('GroupsUsers', {
        groupID: {
            type: Sequelize.UUID,
        },
        userID: {
            type: Sequelize.UUID,
        },

        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }).then(() => queryInterface.addConstraint('GroupsUsers', {
        fields: ['groupID', 'userID'],
        type: 'unique',
        name: 'groupID_userID_index'
    })),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('GroupsUsers'),
};