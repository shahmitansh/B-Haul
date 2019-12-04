const {Bundle, Product, ProductList} = require('./product.js')
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

const aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-west-1', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.Bucket

//Serving static files from the react app as necessary
app.use(express.static(path.join(__dirname, '/frontend/build')))

// Connection URL
var mongoDao = null;
const url = 'mongodb+srv://admin:supereasytormb@cluster0-bgrbj.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'bhaul';

app.post('/sign_s3', (req,res) => {
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    // Send it all back
    res.json({success:true, data:{returnData}});
  });
});

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


app.get('/getBundleList', async (req, res, next) => {
	try {
		await initDb();
		let bundles = await mongoDao.readCollection('bundles');
		res.send(bundles)
	} catch (error) {
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
});


app.post('/addBundle', async function(request, response, next){
	try {
		await initDb();
		let bundleID = await nextBundleID()
		let doc = request.body
		let productIDs = doc["productIDs"]
		let arraylength = productIDs.length
		for (let i = 0; i < arraylength; i++){
			let pID = productIDs[i]
			let product = await mongoDao.findDocuments('products', {productID: pID});
			product[0].bundleID = bundleID
			await mongoDao.updateDocument('products', {productID: pID}, {$set: product[0]});
		}

		let bundle = new Bundle(bundleID, doc["productIDs"])

		await mongoDao.insertDocument("bundles", bundle, () => {});
		response.send("Successfully inserted bundle")

	} catch (error) {
		console.log(error)
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}

});


app.delete('/deleteBundle/:bundleID', async function(request, response, next){
	try {
		initDb();
		let toDeleteBundleID = Number(request.params["bundleID"])
		let query = {bundleID: toDeleteBundleID}
		let bundle = await mongoDao.findDocuments('bundles', query);
		let productIDs = bundle[0].productIDs
		let arraylength = productIDs.length
		for (let i = 0; i < arraylength; i++){
			let pID = productIDs[i]
			let product = await mongoDao.findDocuments('products', {productID: pID});
			product[0].bundleID = undefined
			await mongoDao.updateDocument('products', {productID: pID}, {$set: product[0]})
		}
		await mongoDao.deleteDocument('bundles', query)
		response.send("Successfully deleted bundle")
	} catch (error) {
		console.log(error)
		let err = new Error('Database connection issue');
		err.statusCode = 503;
  		return next(err);
	}
})


app.get('/getProductList/filtered',  async (req, res, next) => {
	try {
		await initDb();
		let products = await getProductListClass();
		if (Object.keys(req.query).length == 0) {
			res.send(products);
		} else {
			let filterType = req.query['type'];
			if (!(filterType== undefined)){
				products = new ProductList(products.returnFilteredProductsType(filterType.toLowerCase()));
			}
			let filterPrice = req.query['price']
			if (!(filterPrice== undefined)){
				let [lowPrice, highPrice] = filterPrice.split(',')
				lowPrice = parseFloat(lowPrice)
				highPrice = parseFloat(highPrice)

				products = new ProductList(products.returnFilteredProductsPrice(lowPrice, highPrice));
			}
			let filterColor = req.query['color'];
			if (!(filterColor== undefined)){
				products = new ProductList(products.returnFilteredProductsColor(filterColor.toLowerCase()));
			}
			console.log(JSON.stringify(products))
			res.send(products)
		}
	} catch (error) {
		console.log(error);
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
		let product = new Product(productID, doc["name"], doc["elevation"], doc["address"], doc["description"], doc["sellerID"], doc["price"], doc["type"], doc["location"], doc["hasElevator"], doc["color"], doc["size"], doc["imageURL"])
		console.log(product);
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

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))
console.log("Hi");
mongoDao = initDb()

/**
 * Get related elevation information from both the Buyer and Seller
 * @param  {Number} latSrc - Latitude from Buyer.
 * @param  {Number} longSrc - Longitude from Buyer.
 * @param  {Number} latDest - Latitude from Seller.
 * @param  {Number} longDest - Longitude from Seller.
 * @return {Promise} - Promise that resolves when operation is done.
 */
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

/**
 * Generates new ID for each new product added
 * @return {Number} - Integer that represents the lastest generated productID.
 */
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


async function nextBundleID(){
	await initDb();
	let listings = await mongoDao.readCollection('bundles');
	let arraylength = listings.length
	let maxID = 0
	for (let i = 0; i < arraylength; i++){
		let pID = listings[i]["bundleID"]
		if (pID > maxID){
			maxID = pID
		}
	}
	return maxID + 1;
}


/**
 * Generates a ProductList object containing all the products in the database.
 * @return {ProductList} - ProductList object that contains all the products in the database.
 */
async function getProductListClass(){
	await initDb();
	let listings = await mongoDao.readCollection('products');
	let arraylength = listings.length;
	let products = {};
	for (let i = 0; i < arraylength; i++){
		let doc = listings[i];
		let productID = doc["productID"];
		products[productID] = new Product(productID, doc["name"], doc["elevation"], doc["address"], doc["description"], doc["sellerID"], doc["price"], doc["type"], doc["location"], doc["hasElevator"], doc["color"], doc["size"], doc["imageURL"], doc["bundleID"]);
	}
	return new ProductList(products);
}

// getListings()

/**
 * Initiates the databse for the web page.
 * @return {MongoDao} - MongoDao object that represents the database for the web page
 */
async function initDb() {
	if (!mongoDao) {
		mongoDao = await new MongoDao(url, dbName);
		console.log("db initted")
	}

	return mongoDao
}

//Catchall that sends any request not specified above to index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})


// For testing
module.exports = app;
