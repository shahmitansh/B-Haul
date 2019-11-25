const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');

function MongoDao(mongoUri, dbname) {
    var _this = this;
    var options = {
        useNewUrlParser: true
    };
    _this.mongoClient = new MongoClient(mongoUri, options);
    return new Promise(function(resolve, reject) {
        _this.mongoClient.connect(function(err, client) {
            assert.equal(err, null);
            console.log(" Successfully connected to mongo client! \n");
            _this.dbConnection = _this.mongoClient.db(dbname);
            resolve(_this);
        });
    });
}

MongoDao.prototype.readCollection = function(collectionName) {
	let _this = this;
	return new Promise(function(resolve, reject) {
		_this.dbConnection.collection(collectionName).find().toArray((err, docs) => {
			if(err) {
				reject(err);
			} else {
				resolve(docs);
			}
		})
	});
}

MongoDao.prototype.printDocument = function(collectionName, doc) {
	let _this = this;
	return new Promise(function(resolve, reject) {
			_this.dbConnection.collection(collectionName).find({}).filter(doc).toArray(function(err, docs) {
				if(err) {
					reject(err);
				} else {
					console.log(docs[0]);
					console.log("\n");
					resolve();
				}	
		});
	});
}

MongoDao.prototype.insertDocument = function(collectionName, doc) {
	let _this = this;
	return new Promise(function(resolve, reject) {
		_this.dbConnection.collection(collectionName).insertOne(doc, function(err, result) {
			if(err) {
				reject(err);
			} else {
				console.log(" Document inserted successfully:");
				resolve();
			}			
		});
	});
}

MongoDao.prototype.updateDocument = function(collectionName, doc, updateDocument) {
	let _this = this;
	return new Promise(function(resolve, reject) {
			_this.dbConnection.collection(collectionName).updateMany(doc, updateDocument, function(err, result) {
				if (err) {
					reject(err);
				} else {
					console.log(" Document updated successfully:");
					resolve();
				}
		});
	});
}

MongoDao.prototype.deleteDocument = function(collectionName, doc) {
	let _this = this;
	return new Promise(function(resolve, reject) {
			_this.dbConnection.collection(collectionName).deleteOne(doc, function(err, result) {
				if (err) {
					reject(err);
				} else {
					console.log(" Document deleted successfully:");
					resolve();
				}
		});
	});
}

MongoDao.prototype.deleteAllDocuments = function(collectionName) {
	let _this = this;
	return new Promise(function(resolve, reject) {
			_this.dbConnection.collection(collectionName).deleteMany({}, function(err, result) {
				if(err) {
					reject(err);
				} else {
					console.log("cleared all documents successfully");
					resolve();
				}
		});
	});
}

MongoDao.prototype.findDocuments = function(collectionName, doc) {
	let _this = this;
	return new Promise(function(resolve, reject) {
			_this.dbConnection.collection(collectionName).find(doc).toArray((err, docs) => {
				if(err) {
					reject(err);
				} else {
					resolve(docs);
				}
		});
	});
}

module.exports = MongoDao;