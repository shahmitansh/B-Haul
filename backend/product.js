const productTypes = {"seating": 1, "bed": 2, "table": 3, "storage": 4, "other": 5};
const productColors = {"red": 1, "green": 2, "blue":3, "black":4, "grey":5, "brown":6, "orange":7, "white":8}
const filterFactory =  require('./filterFactory.js');

class Product {

	/**
 	* Represents Product object.
 	* @constructor
 	* @param {Number} productID - ID to represent unique Product
 	* @param {String} name - Name of Product
	* @param {Number} elevation - Elevation information for where the product is being sold from
	* @param {String} address - Address of where the Seller plans to meet with potential Buyers
	* @param {String} description - Description of Product
  	* @param {Number} sellerID - unique ID of person selling Product
  	* @param {Number} price - Price listed for Product
  	* @param {String} type - Description of Product type
  	* @param {String} location - Description of Product location
  	* @param {Boolean} hasElevator - Whether location has an elevator or not
  	* @param {String} color - Description of Product color
	* @param {String} size - Description of Product size
	* @param {String} imageURL - Description of Product image URL
 	*/
	constructor(productID, name, elevation, address, description,
		sellerID, price, type, location, hasElevator, color, size, imageURL){
		this.productID = productID;
		this.name = name;
		this.address = address;
		this.description = description;
		this.sellerID = sellerID;
		this.price = price;
		this.elevation = elevation;
		this.hasElevator = hasElevator
		this.size = size
		this.imageURL = imageURL
		// if (!(color in productColors)){
		// 	console.log(`product color ${color} not in allowed product colors ${JSON.stringify(productColors)}`);
		// }
		// // console.log( "couch" in productTypes)
		// let arraylength = type.length;
		// for (let i = 0; i < arraylength; i++){
		// 	if (!(type[i] in productTypes)){
		// 		console.log(`product type ${type[i]} not in allowed product types ${JSON.stringify(productTypes)}`);
		// 	}
		// }
		this.type = type;
		this.color = color
		this.location = location;
	}
}

class ProductList{
	/**
 	* Represents a list of all the products stored in the database.
 	* @constructor
 	* @param {ProductList} productList - ProductList object that is used to initialize the original list of products
 	*/
	constructor(productList){
		if(productList == undefined){
			this.products = {};
		}else{
			this.products = productList;
		}
	}

	/**
 	* Adds a product to the database.
	* @param {Product} product - Product object that is to be added to the database
 	*/
	addProduct(product){
		this.products[product.productID] = product;
	}

	/**
 	* Removes a product from the database.
	* @param {Number} productID - Unique ID of prod that is to be removed from the database
 	*/
	removeProduct(productID){
		if (!(productID in this.products)){
			console.log(`product with productID ${productID} not in product list`);
		}else{
			delete this.products[productID];
		}
	}

	/**
 	* Returns a list of Products filtered by type.
	* @param {string} type - Describes the type of product e.g. desk, chair, couch, etc.
	* @return {Product[]} - An array of Products filtered by type
 	*/
	returnFilteredProductsType(type){
		console.log("inside returnFilteredProductsType")
		return filterFactory.filterMethod(this.products, type, "type");
	}

	/**
 	* Returns a list of Products filtered by type.
	* @param {Number} lower_bound - Lower bound price range
	* @param {Number} upper_bound - Upper bound price range
	* @return {Product[]} - An array of Products filtered by price either by price lower than or price higher than
 	*/
	returnFilteredProductsPrice(lower_bound, upper_bound){
		let upperBoundedProducts = filterFactory.filterMethod(this.products, upper_bound, "pricelower");
		return filterFactory.filterMethod(upperBoundedProducts, lower_bound, "pricehigher");
	}

	/**
 	* Returns a list of Products filtered by color.
	* @param {string} type - Describes the color of the product
	* @return {Product[]} - An array of Products filtered by color
 	*/
	returnFilteredProductsColor(color){
		return filterFactory.filterMethod(this.products, color, "color");
	}

	/**
 	* Returns a list of Products filtered by size.
	* @param {string} type - Describes the size of the product
	* @return {Product[]} - An array of Products filtered by size
 	*/
	returnFilteredProductsSize(size){
		return filterFactory.filterMethod(this.products, size, "size");
	}

}

module.exports = { Product, ProductList };
