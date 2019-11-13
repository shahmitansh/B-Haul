const express = require('express');
const http = require('http');
const API_KEY = 'yVorBMk3X9NbVuWK6h9I8TwEDC0hTUgT';
const request = require('request');
import Product from './product.js'
import ProductList from './product.js'
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});

app.get('/', (req, res) => res.send('Hello World!'));

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



function getProductList(){
	// return product list
}
