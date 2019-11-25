const productTypes = {"table": 1, "bed": 2, "chair": 3, "couch": 4};
const filterFactory =  require('./filterFactory.js');

class Product {
	constructor(productID, title, elevation, address, description, sellerID, price, type, location){
		this.productID = productID;
		this.title = title;
		this.address = address;
		this.description = description;
		this.sellerID = sellerID;
		this.price = price;
		this.elevation = elevation;
		// console.log( "couch" in productTypes)
		if (!(type in productTypes)){
			console.log(`product type ${type} not in allowed product types ${JSON.stringify(productTypes)}`);
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
		console.log("inside returnFilteredProductsType")
		return filterFactory.filterMethod(this.products, type, "type");
	}

	returnFilteredProductsPrice(lower_bound, upper_bound){
		upper_bounded_products = filterFactory.filterMethod(this.products, upper_bound, "pricelower");
		return filterFactory.filterMethod(upper_bounded_products, lower_bound, "pricehigher");
	}
		

}

module.exports = { Product, ProductList };