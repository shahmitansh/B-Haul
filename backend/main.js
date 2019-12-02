const {Product, ProductList} = require('./product.js')
const bodyParser = require('body-parser')
const express = require('express');
const path = require('path')
const API_KEY = 'yVorBMk3X9NbVuWK6h9I8TwEDC0hTUgT';
const request = require('request');
const app = express();
app.use(bodyParser());

const port = 3000;
const FilterFactory = require('./filterFactory.js')
const MongoDao = require('./dao.js');

//Serving static files from the react app as necessary
//app.use(express.static(path.join(__dirname, '../frontend/src')))

// Connection URL
var mongoDao = null;
const url = 'mongodb+srv://admin:supereasytormb@cluster0-bgrbj.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'bhaul';

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/getProductList', async (req, res, next) => {
	try {
		await initDb();
		let products = await getProductListClass();
		res.send(products)
	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
});


app.get('/getProductList/filtered',  async (req, res, next) => {
	try {
		await initDb();
		let products = await getProductListClass();
		if (Object.keys(req.query).length == 0) {
			res.send(products);
		} else {
			let filterType = req.query['type'].toLowerCase();
			if (!(filterType== undefined)){
				products = new ProductList(products.returnFilteredProductsType(filterType));
			}
			let filterPrice = req.query['price']
			if (!(filterPrice== undefined)){
				let [lowPrice, highPrice] = filterPrice.split(',')
				lowPrice = parseFloat(lowPrice)
				highPrice = parseFloat(highPrice)

				products = new ProductList(products.returnFilteredProductsPrice(lowPrice, highPrice));
			}
			let filterColor = req.query['color'].toLowerCase();
			if (!(filterColor== undefined)){
				products = new ProductList(products.returnFilteredProductsColor(filterColor));
			}
			console.log(JSON.stringify(products))
			res.send(products)
		}
	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
});



app.get('/getProductList/type/:filterType',  async (req, res, next) => {
	try {
		await initDb();
		let products = await getProductListClass();
		let filterType = req.params['filterType']
		let filteredProducts = new ProductList(products.returnFilteredProductsType(filterType));
		console.log(JSON.stringify(filteredProducts))
		res.send(filteredProducts)

	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
});


app.get('/getProductList/price/:lowPrice/:highPrice', async(req, res, next) => {
	try {
		await initDb();
		let products = await getProductListClass();
		let lowPrice = req.params['lowPrice']
		let highPrice = req.params["highPrice"]
		let filteredProducts = new ProductList(products.returnFilteredProductsPrice(lowPrice, highPrice));
		console.log(JSON.stringify(filteredProducts))
		res.send(filteredProducts)

	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
});

app.get('/getProductList/color/:filterColor',  async (req, res, next) => {
	try {
		await initDb();
		let products = await getProductListClass();
		let filterColor = req.params['filterColor']
		let filteredProducts = new ProductList(products.returnFilteredProductsColor(filterColor));
		// console.log(JSON.stringify(filteredProducts))
		res.send(filteredProducts)

	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
});

app.get('/getProductList/size/:filterSize',  async (req, res, next) => {
	try {
		await initDb();
		let products = await getProductListClass();

		let filterSize = req.params['filterSize']
		let filteredProducts = new ProductList(products.returnFilteredProductsSize(filterSize));
		// console.log(JSON.stringify(filteredProducts))
		res.send(filteredProducts)

	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
});


app.post('/addListing', async function(request, response, next){
	try {
		await initDb();
		let productID = await nextProductID()
		let doc = request.body
		let product = new Product(productID, doc["name"], doc["elevation"], doc["address"], doc["description"], doc["sellerID"], doc["price"], doc["type"], doc["location"], doc["hasElevator"], doc["color"], doc["size"])
		await mongoDao.insertDocument("products", product, () => {});
		response.send("Successfully inserted document")

	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}

});


app.get('/getProductById/:productID', async function(request, response, next){
	try {
		await initDb();
		let pID = Number(request.params["productID"])
		let product = await mongoDao.findDocuments('products', {productID: pID});
		response.send(product[0])
	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
})

app.delete('/deletePosting/:productID', async function(request, response, next){
	try {
		initDb();
		let toDeleteProductID = Number(request.params["productID"])
		let query = {productID: toDeleteProductID}
		console.log(query)
		await mongoDao.deleteDocument('products', query)
		response.send("Successfully deleted document")
	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
})

app.get('/elevationprofile/:latSrc/:longSrc/:latDest/:longDest', async (req, res, next) => {
	let [latSrc, latLong, latDest, longDest] =
	[req.params["latSrc"], req.params["longSrc"], req.params["latDest"], req.params["longDest"]];

	try {
		let elevationRequestResponse = await getElevationProfile(latSrc, latLong, latDest, longDest);
	} catch (error) {
		let err = new Error('Error fetching elevation profile');
		err.statusCode = 503;
  		return next(err);
	}
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
		products[productID] = new Product(productID, doc["name"], doc["elevation"], doc["address"], doc["description"], doc["sellerID"], doc["price"], doc["type"], doc["location"], doc["hasElevator"], doc["color"], doc["size"]);
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


//Catchall that sends any request not specified above to index.html
//app.get('*', (req,res) =>{
//	res.sendFile(path.join(__dirname +'../frontend/public/index.html'));
//});


// For testing
module.exports = app;
