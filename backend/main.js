const {Product, ProductList} = require('./product.js')

const express = require('express');
const API_KEY = 'yVorBMk3X9NbVuWK6h9I8TwEDC0hTUgT';
const request = require('request');
const app = express();
const port = 3000;
const MongoDao = require('./dao.js');

// Connection URL
var mongoDao = null;
const url = 'mongodb+srv://admin:supereasytormb@cluster0-bgrbj.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'bhaul';

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/getProductList', (req, res) => {
	initDb().then((mongoDao) => {
		mongoDao.readCollection('products').toArray((err, items) => {
			console.log(items);
			res.send(items);
		});
	});
}); 
app.get('/elevationprofile/:latSrc/:longSrc/:latDest/:longDest', (req, res) => {
	let [latSrc, latLong, latDest, longDest] = 
	[req.params["latSrc"], req.params["longSrc"], req.params["latDest"], req.params["longDest"]];
	let elevationRequestResponse = getElevationProfile(latSrc, latLong, latDest, longDest);
	res.send(elevationRequestResponse);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
console.log("Hi");

function getElevationProfile(latSrc, longSrc, latDest, longDest){
	const base_url = 'http://open.mapquestapi.com/elevation/v1/profile';
	let latLongCollection = `${latSrc},${longSrc},${latDest},${longDest}`;
	let request_url = `${base_url}?key=${API_KEY}&latLngCollection=${latLongCollection}`;
	console.log(request_url);
	let resp =  request(request_url, function (error, response, body){
	console.error('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	console.log('body:', body); // Print the HTML for the Google homepage.
	});
}


function initDb() {
	if (!mongoDao) {
		mongoDao = new MongoDao(url, dbName);
	}
	return mongoDao
}

// For testing
module.exports = app;

