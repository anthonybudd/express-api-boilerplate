require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');
const should = chai.should();

chai.use(chaiHttp);

let accessToken;


describe('User', () => {

    before('User', async () => {
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
     * GET  /api/v1/user
     * 
     */
    describe('GET  /api/v1/user', () => {


        it('Should return the user model', done => {
            chai.request(server)
                .get('/api/v1/user')
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        });

        it('Should reject bad access token', done => {
            chai.request(server)
                .get('/api/v1/user')
                .set({
                    'Authorization': `Bearer BAD.TOKEN`,
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });


    /**
     * POST /api/v1/user
     * 
     */
    describe('POST /api/v1/user', () => {
        it('Should update the current user', done => {
            chai.request(server)
                .post('/api/v1/user')
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .send({
                    firstName: 'John',
                    lastName: 'Smith',
                    bio: 'I am a developer',
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    /**
     * POST /api/v1/user/update-password
     * 
     */
    describe('POST /api/v1/user/update-password', () => {
        it('Should update the current users password', (done) => {
            chai.request(server)
                .post('/api/v1/user/update-password')
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .send({
                    password: 'Password@1234',
                    newPassword: 'newpassword@5678'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});