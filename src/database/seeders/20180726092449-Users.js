const bcrypt = require('bcrypt-nodejs');
const faker = require('faker');

const insert = [{
    id: 'c4644733-deea-47d8-b35a-86f30ff9618e',
    email: 'user@example.com',
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    firstName: 'Anthony',
    lastName: 'Budd',
    tos: '2021-12-19',
}, {
    id: 'd700932c-4a11-427f-9183-d6c4b69368f9',
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    tos: '2021-12-19',
}];


module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', insert).catch(err => console.log(err)),
    down: (queryInterface, Sequelize) => { }
};
