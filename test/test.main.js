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

    afterEach(function () {
        sinon.restore();
    });

    describe('GET /getProductsList', () => {
        it('it should return all products obtained', (done) => {
            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.resolve([]));
            chai.request(server)
                .get("/getProductList")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList', () => {
        it('it should return a 503 if the db returns a failure', (done) => {

            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.reject());
            chai.request(server)
                .get("/getProductList")
                .end((err, res) => {
                    res.should.have.status(503);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/filtered', () => {
        it('it should return the filtered version of products obtained', (done) => {
            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.resolve([
                {"productID": 1, "color": "black"},
                {"productID": 2, "color": "blue"},
            ]));
            chai.request(server)
                .get("/getProductList/filtered")
                .send({"color": "black"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('products');
                    // res.body.products.length.should.equal(1);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/filtered', () => {
        it('it should return a 503 if the db returns a failure', (done) => {
            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.reject());
            chai.request(server)
                .get("/getProductList/filtered")
                .send({"color": "black"})
                .end((err, res) => {
                    res.should.have.status(503);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/type/:filterType', () => {
        it('it should return filtered by type objects', (done) => {
            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.resolve([
                {"productID": 1, "type": "table"},
                {"productID": 2, "type": "chair"},
                ]));
            chai.request(server)
                .get("/getProductList/type/table")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.products.length.should.equal(1);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/type/:filterType', () => {
        it('it should return a 503 if the db returns a failure', (done) => {

            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.reject());
            chai.request(server)
                .get("/getProductList/type/table")
                .end((err, res) => {
                    res.should.have.status(503);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/color/:filterColor', () => {
        it('it should return products filtered by color', (done) => {
            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.resolve([
                {"productID": 1, "color": "black"},
                {"productID": 2, "color": "blue"},
                ]));
            chai.request(server)
                .get("/getProductList/color/black")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.products.length.should.equal(1);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/color/:filterColor', () => {
        it('it should return a 503 if the db returns a failure', (done) => {

            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.reject());
            chai.request(server)
                .get("/getProductList/color/black")
                .end((err, res) => {
                    res.should.have.status(503);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/size/:filterSize', () => {
        it('it should return products filtered by size', (done) => {
            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.resolve([
                {"productID": 1, "size": "M"},
                {"productID": 2, "size": "L"},
                ]));
            chai.request(server)
                .get("/getProductList/size/M")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.products.length.should.equal(1);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/size/:filterSize', () => {
        it('it should return a 503 if the db returns a failure', (done) => {

            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.reject());
            chai.request(server)
                .get("/getProductList/size/M")
                .end((err, res) => {
                    res.should.have.status(503);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/price/:lowPrice/:highPrice', () => {
        it('it should return filtered products obtained', (done) => {

            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.resolve([
                {"productID": 1, "price": 1},
                {"productID": 2, "price": 2},
                {"productID": 3, "price": 3},
                ]));

            chai.request(server)
                .get("/getProductList/price/1/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('products');
                    res.body.products.length.should.equal(2);
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductsList/price/:lowPrice/:highPrice', () => {
        it('it should return a 503 if the db returns a failure', (done) => {

            let _stub = sinon.stub(MongoDao.prototype, "readCollection").returns(Promise.reject());

            chai.request(server)
                .get("/getProductList/price/1/2")
                .end((err, res) => {
                    res.should.have.status(503);
                    _stub.restore();
                    done();
                });
        });
    });


    describe('GET /getProductById/:productID', () => {
        it('it should return products filtered by ID', (done) => {
            let _stub = sinon.stub(MongoDao.prototype, "findDocuments").returns(Promise.resolve([
                {"productID": 1},
                ]));
            chai.request(server)
                .get("/getProductById/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    _stub.restore();
                    done();
                });
        });
    });

    describe('GET /getProductById/:productID', () => {
        it('it should return a 503 if the db returns a failure', (done) => {

            let _stub = sinon.stub(MongoDao.prototype, "findDocuments").returns(Promise.reject());
            chai.request(server)
                .get("/getProductById/1")
                .end((err, res) => {
                    res.should.have.status(503);
                    _stub.restore();
                    done();
                });
        });
    });
});
