const {Product, ProductList} = require('./product.js')
const bodyParser = require('body-parser')
const express = require('express');
const API_KEY = 'yVorBMk3X9NbVuWK6h9I8TwEDC0hTUgT';
const request = require('request');
const app = express();
app.use(bodyParser());

const port = 3000;
const FilterFactory = require('./filterFactory.js')
const MongoDao = require('./dao.js');

// Connection URL
var mongoDao = null;
const url = 'mongodb+srv://admin:supereasytormb@cluster0-bgrbj.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'bhaul';

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/getProductList', async (req, res) => {
	await initDb();

	let products1 = await mongoDao.findDocuments('products', {productID: 2});
	console.log(products1);
	let products = await getProductListClass();
	res.send(products)
}); 

app.post('/addListing', async function(request, response){
	initDb();
	productID = await nextProductID()
	doc = request.body
	product = new Product(productID, doc["name"], doc["elevation"], doc["address"], doc["description"], doc["sellerID"], doc["price"], doc["type"], doc["location"])
	mongoDao.insertDocument("products", product, () => {});
	response.send("Successfully inserted document")
});

app.get('/elevationprofile/:latSrc/:longSrc/:latDest/:longDest', async (req, res) => {
	let [latSrc, latLong, latDest, longDest] = 
	[req.params["latSrc"], req.params["longSrc"], req.params["latDest"], req.params["longDest"]];
	let elevationRequestResponse = await getElevationProfile(latSrc, latLong, latDest, longDest);
	res.send(elevationRequestResponse);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
console.log("Hi");
mongoDao = initDb()

function getElevationProfile(latSrc, longSrc, latDest, longDest){
	return new Promise(function(resolve, reject) {
		const base_url = 'http://open.mapquestapi.com/elevation/v1/profile';
		let latLongCollection = `${latSrc},${longSrc},${latDest},${longDest}`;
		let request_url = `${base_url}?key=${API_KEY}&latLngCollection=${latLongCollection}`;
		console.log(request_url);
		
		let resp =  request(request_url, function (error, response, body){
			if (error) {
				console.error('error:', error); // Print the error if one occurred
				reject(error);
			} else {
				let responsedict = {};
				console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
				console.log('body:', body); // Print the HTML for the Google homepage.
				let elevationProfile = JSON.parse(body)["elevationProfile"];
				let elevationSrc = elevationProfile[0]["height"]
				let elevationDest = elevationProfile[1]["height"]
				responsedict["elevationSrc"] = elevationSrc
				responsedict["elevationDest"] = elevationDest
				console.log(elevationSrc)
				console.log(elevationDest)

				resolve(responsedict);
			}
		});
	})
	
}

async function nextProductID(){
	await initDb();
	let listings = await mongoDao.readCollection('products');
	let arraylength = listings.length
	let maxID = 0
	for (let i = 0; i < arraylength; i++){
		let pID = listings[i]["productID"]
		if (pID > maxID){
			maxID = pID
			console.log("here")
		}
	}
	return maxID + 1;
}


async function getProductListClass(){
	await initDb();
	let listings = await mongoDao.readCollection('products');
	let arraylength = listings.length;
	let products = {};
	for (let i = 0; i < arraylength; i++){
		let doc = listings[i];
		let productID = doc["productID"];
		products[productID] = new Product(productID, doc["name"], doc["elevation"], doc["address"], doc["description"], doc["sellerID"], doc["price"], doc["type"], doc["location"]);
	}
	return new ProductList(products);
}

// getListings()

async function initDb() {
	if (!mongoDao) {
		mongoDao = await new MongoDao(url, dbName);
		console.log("db initted")
	}

	return mongoDao
}

// For testing
module.exports = app;

