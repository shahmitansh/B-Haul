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

	beforeEach(async () => {
		await mongoDao.deleteAllDocuments(collection, ()=>{});
	});

	describe('Insert one product into MongoDao', () => {
		it('it should insert one product', async () => {
			let doc = {"key1": "value1"}
			await mongoDao.insertDocument(collection, doc);
			let docs = await mongoDao.readCollection(collection);

			chai.assert.equal(docs.length, 1);
		});
	});

	describe('Find one product from MongoDao', () => {
		it('it should find one product', async () => {
			let doc = {"key2": "value2"}
			await mongoDao.insertDocument(collection, doc);
			let docs = await mongoDao.findDocuments(collection, doc);

			chai.assert.equal(docs.length, 1);
			chai.assert.deepEqual(doc, docs[0])
		});
	});
	
	describe('Removing one product from MongoDao', () => {
		it('it should remove one product', async () => {
			let doc = {"key3": "value3"}
			await mongoDao.insertDocument(collection, doc);
			await mongoDao.deleteDocument(collection, doc);
			let docs = await mongoDao.readCollection(collection);

			chai.assert.equal(docs.length, 0);
		});
	});

	describe('Update one product from MongoDao', () => {
		it('it should update the product', async () => {
			let orig_doc = {"key1": "value1"};
			let new_doc = {"key1": "value2", "key2": "value2"};
			await mongoDao.insertDocument(collection, orig_doc);
			await mongoDao.updateDocument(collection, orig_doc, {$set: new_doc});

			let docs = await mongoDao.readCollection(collection);

			chai.assert.equal(docs.length, 1);
			chai.assert.equal(docs[0]["key1"], new_doc["key1"]);
			chai.assert.equal(docs[0]["key2"], new_doc["key2"]);
		});
	});

	describe('Delete all products from MongoDao', () => {
		it('it should delete all products', async () => {
			await mongoDao.insertDocument(collection, {"key1": "value1"});
			await mongoDao.insertDocument(collection, {"key1": "value1"});
			await mongoDao.deleteAllDocuments(collection);
			
			let docs = await mongoDao.readCollection(collection);
			chai.assert.equal(docs.length, 0);
		});
	});
});
