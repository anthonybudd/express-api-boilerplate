var insert = [{
    id: '00000000-9a34-4466-ba4c-46438def7d7f',
    ownerID: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    name: 'Group A',
}, {
    id: 'be1fcb4e-caf9-41c2-ac27-c06fa24da36a',
    ownerID: 'd700932c-4a11-427f-9183-d6c4b69368f9',
    name: 'Group B',
}];


module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Groups', insert).catch(err => console.log(err)),
    down: (queryInterface, Sequelize) => { }
};
