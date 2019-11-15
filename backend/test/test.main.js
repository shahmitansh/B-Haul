process.env.NODE_ENV = 'test';

let MongoDao = require('../dao.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main.js');
let should = chai.should()

chai.use(chaiHttp);

describe('B-Haul Server', () => {
    beforeEach((done) => {
        done();
    });

    describe('/GET product listing', () => {
        it('it should GET the books', (done) => {
            done();
        });
    });
});