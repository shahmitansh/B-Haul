process.env.NODE_ENV = 'test';

let MongoDao = require('../dao.js');
let server = require('../main.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should()
let sinon = require('sinon')

chai.use(chaiHttp);



describe('getProductList', () => {
    beforeEach((done) => {      
        done();
    });

    describe('GET /getProductsList', () => {
        it('it should return all products obtained', (done) => {

            chai.request(server)
                .get("/getProductList")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET /getProductsList/price/:lowPrice/:highPrice', () => {
        it('it should return filtered products obtained', (done) => {

            chai.request(server)
                .get("/getProductList/price/0/1000")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});
