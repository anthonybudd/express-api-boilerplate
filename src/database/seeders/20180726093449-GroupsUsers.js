const insert = [    
    {
        userID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
        groupID: 'fdab7a99-2c38-444b-bcb3-f7cef61c275b',
    }, {
        userID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
        groupID: 'be1fcb4e-caf9-41c2-ac27-c06fa24da36a',
    }, {
        userID: 'd700932c-4a11-427f-9183-d6c4b69368f9',
        groupID: 'be1fcb4e-caf9-41c2-ac27-c06fa24da36a',
    }   
];


module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('GroupsUsers', insert).catch(err => console.log(err)),
    down: (queryInterface, Sequelize) => { }
};
