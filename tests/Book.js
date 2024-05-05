require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');
const should = chai.should();

chai.use(chaiHttp);

const BOOK_ID = 'a04a12a7-4c08-48d4-9ef0-b43cdbf765ad';

let accessToken;

describe('Books', () => {

    before('Books', async () => {
        const { body } = await chai.request(server)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: process.env.TEST_EMAIL,
                password: process.env.TEST_PASSWORD,
            });
        accessToken = body.accessToken;
    });

    /**
     * GET  /api/v1/books
     * 
     */
    describe('GET  /api/v1/books', () => {

        it('Should return all Books', (done) => {
            chai.request(server)
                .get(`/api/v1/books`)
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    done();
                });
        });
    });


    /**
     * GET  /api/v1/books/:bookID
     * 
     */
    describe('GET  /api/v1/books/:bookID', () => {

        it('Should return single Book', (done) => {
            chai.request(server)
                .get(`/api/v1/books/$_ID}`)
                .set({
                    'Authorization': `Bearer ${ accessToken }`,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        });
    });


    /**
     * POST /api/v1/books
     * 
     */
    describe('POST /api/v1/books', () => {

        it('Should update Book', done => {
            chai.request(server)
                .post(`/api/v1/books`)
                .set({
                    'Authorization': `Bearer ${ accessToken }`,
                })
                .send({
                    field: 'foo'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        });
    });


    /**
     * POST /api/v1/books/:bookID
     * 
     */
    describe('POST /api/v1/books/:bookID', () => {
        it('Should invite user to the group', done => {
            chai.request(server)
                .post(`/api/v1/books/${ BOOK_ID}`)
    .set({
        'Authorization': `Bearer ${accessToken}`,
    })
    .send({
        field: 'bar',
    })
    .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
    });
        });
    });


/**
 * DELETE /api/v1/books/:bookID
 * 
 */
describe('DELETE /api/v1/books/:bookID', () => {
    it('Should delete the Book', done => {
        chai.request(server)
            .delete(`/api/v1/books/$_ID}`)
                .set({
                    'Authorization': `Bearer ${ accessToken }`,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        });
    });
});;;
