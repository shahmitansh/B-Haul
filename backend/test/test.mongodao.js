process.env.NODE_ENV = 'test';

let MongoDao = require('../dao.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should()
let sinon = require('sinon')

chai.use(chaiHttp);

let mongoDao = null;
let url = 'mongodb+srv://admin:supereasytormb@cluster0-ua3cx.mongodb.net/test?retryWrites=true&w=majority';
let dbName = 'bhaul'
let collection = 'test'

describe('MongoDao', () => {
	before(async () => {
		mongoDao = await new MongoDao(url, dbName)
		return mongoDao
	});

	beforeEach(() => {
		return mongoDao.deleteAllDocuments(collection, ()=>{});
	});

	describe('Insert one product into MongoDao', () => {
		it('it should insert one product', (done) => {
			let doc = {"key1": "value1"}
			mongoDao.insertDocument(collection, doc, () => {
				mongoDao.readCollection(collection).toArray(function(err, docs) {
					chai.assert.equal(docs.length, 1);
					done();
				});
			});
		});
	});
});