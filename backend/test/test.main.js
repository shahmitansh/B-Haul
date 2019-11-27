process.env.NODE_ENV = 'test';

let MongoDao = require('../dao.js');
let {getProductList, getElevationProfile} = require('../main.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should()
let sinon = require('sinon')

chai.use(chaiHttp);

class mockMongoDao {
    readCollection(collection) {
        return {
            toArray: (cb) => cb(new Promise(function(resolve, reject) {resolve({item1: 'value1'})}))
        };
    }
}

class mockFailedMongoDao {
    readCollection(collection) {
        return new Promise(function(resolve, reject) {reject({})});
    }
}

describe('getProductList', () => {
    beforeEach((done) => {      
        done();
    });

    // describe('getProductList with valid input', () => {
    //     it('it should return items obtained', (done) => {
    //         // let mockMongoDao = sinon.mock(MongoDao);
    //         let cb = sinon.spy();
    //         getProductList(
    //             new mockMongoDao(), 
    //             cb
    //         );
    //         chai.assert.isTrue(cb.called)
    //         done();
    //     });
    // });
});


// describe('getElevationProfile', () => {
//     beforeEach((done) => {
//         done();
//     });

//     describe('getElevationProfile with valid input', () => {
//         it('should return elevation profile obtained', (done) => {

//         });
//     });
// });