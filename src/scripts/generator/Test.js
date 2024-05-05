require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');
const should = chai.should();

chai.use(chaiHttp);

const {{ MODELNAME }}_ID = '{{ UUID }}';

let accessToken;

describe('{{ ModelNames }}', () => {

    before('{{ ModelNames }}', async () => {
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
     * GET  /api/v1/{{ modelnames }}
     * 
     */
    describe('GET  /api/v1/{{ modelnames }}', () => {

        it('Should return all {{ ModelNames }}', (done) => {
            chai.request(server)
                .get(`/api/v1/{{ modelnames }}`)
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
     * GET  /api/v1/{{ modelnames }}/:{{ modelName }}ID
     * 
     */
    describe('GET  /api/v1/{{ modelnames }}/:{{ modelName }}ID', () => {

        it('Should return single {{ ModelName }}', (done) => {
            chai.request(server)
                .get(`/api/v1/{{ modelnames }}/${ {{{ MODELNAME }}}_ID}`)
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
     * POST /api/v1/{{ modelnames }}
     * 
     */
    describe('POST /api/v1/{{ modelnames }}', () => {

        it('Should update {{ ModelName }}', done => {
            chai.request(server)
                .post(`/api/v1/{{ modelnames }}`)
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
     * POST /api/v1/{{ modelnames }}/:{{ modelName }}ID
     * 
     */
    describe('POST /api/v1/{{ modelnames }}/:{{ modelName }}ID', () => {
        it('Should update the {{ ModelName }}', done => {
            chai.request(server)
                .post(`/api/v1/{{ modelnames }}/${ {{{ MODELNAME }}}_ID}`)
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
 * DELETE /api/v1/{{ modelnames }}/:{{ modelName }}ID
 * 
 */
describe('DELETE /api/v1/{{ modelnames }}/:{{ modelName }}ID', () => {
    it('Should delete the {{ ModelName }}', done => {
        chai.request(server)
                .post(`/api/v1/{{ modelnames }}`)
                .set({
                    'Authorization': `Bearer ${ accessToken }`,
                })
                .send({
                    field: 'foo'
                })
                .end((err, res) => {

                    chai.request(server)
                        .delete(`/api/v1/{{ modelnames }}/${res.body.id}`)
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
    });
});
