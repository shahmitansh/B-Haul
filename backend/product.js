const productTypes = {"Table": 1, "Bed": 2, "Chair": 3, "Couch": 4};
const FilterFactory = require('./filterFactory.js')

class Product {
	constructor(productID, title, elevation, address, description, sellerID, price, type, location){
		this.productID = productID;
		this.title = title;
		this.address = address;
		this.description = description;
		this.sellerID = sellerID;
		this.price = price;
		this.elevation = elevation;
		if (!(type in productTypes)){
			console.log(`product type ${type} not in allowed product types ${productTypes}`);
		}
		this.type = type;
		this.location = location;
	}
}

class ProductList{
	constructor(productList){
		if(productList == undefined){
			this.products = {};
		}else{
			this.products = productList;
		}
	}

	addProduct(product){
		this.products[product.productID] = product;
	}

	removeProduct(productID){
		if (!(productID in this.products)){
			console.log(`product with productID ${productID} not in product list`);
		}else{
			delete this.products[productID];
		}
	}

	returnFilteredProductsType(type){
		return filterMethod(this.products, type, "type");
	}

	returnFilteredProductsPrice(lower_bound, upper_bound){
		upper_bounded_products = filterMethod(this.products, upper_bound, "pricelower");
		return filterMethod(upper_bounded_products, lower_bound, "pricehigher");
	}
		

}

module.exports = { Product, ProductList };