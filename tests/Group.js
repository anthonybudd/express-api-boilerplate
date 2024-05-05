require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');
const should = chai.should();

chai.use(chaiHttp);

const GROUP_ID = 'fdab7a99-2c38-444b-bcb3-f7cef61c275b';
const OTHER_GROUP_ID = '190c8a70-34d1-4281-a775-850058453704';

let accessToken;

describe('Groups', () => {

    before('Groups', async () => {
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
     * GET  /api/v1/groups/:groupID
     * 
     */
    describe('GET  /api/v1/groups/:groupID', () => {

        it('Should return the group', (done) => {
            chai.request(server)
                .get(`/api/v1/groups/${GROUP_ID}`)
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    done();
                });
        });

        it('Should reject bad group', (done) => {
            chai.request(server)
                .get(`/api/v1/groups/${OTHER_GROUP_ID}`)
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });


    /**
     * POST /api/v1/groups/:groupID
     * 
     */
    describe('POST /api/v1/groups/:groupID', () => {

        it('Should update the group name', done => {
            chai.request(server)
                .post(`/api/v1/groups/${GROUP_ID}`)
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .send({
                    name: 'Test Group'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.name.should.equal('Test Group');
                    done();
                });
        });

        it('Should reject bad group', done => {
            chai.request(server)
                .post(`/api/v1/groups/${OTHER_GROUP_ID}`)
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .send({
                    name: 'Test Group'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });


    /**
     * POST  /api/v1/groups/:groupID/users/invite
     * 
     */
    describe('POST  /api/v1/groups/:groupID/users/invite', () => {
        it('Should invite user to the group', done => {
            chai.request(server)
                .post(`/api/v1/groups/${GROUP_ID}/users/invite`)
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .send({
                    email: 'johnsmith@foobar.net',
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('userID');
                    res.body.should.have.property('groupID');
                    done();
                });
        });
    });


    /**
     * DELETE  /api/v1/groups/:groupID/users/:userID
     * 
     */
    describe('DELETE  /api/v1/groups/:groupID/users/:userID', () => {
        it('Should remove user from the group', done => {
            chai.request(server)
                .delete(`/api/v1/groups/${GROUP_ID}/users/d700932c-4a11-427f-9183-d6c4b69368f9`)
                .set({
                    'Authorization': `Bearer ${accessToken}`,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('userID');
                    res.body.should.have.property('groupID');
                    done();
                });
        });
    });
});
