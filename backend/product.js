const productTypes = {"table": 1, "bed": 2, "chair": 3, "couch": 4};
const productColors = {"red": 1, "green": 2, "blue":3, "black":4, "grey":5, "brown":6, "orange":7, "white":8}
const filterFactory =  require('./filterFactory.js');

class Product {
	constructor(productID, title, elevation, address, description, 
		sellerID, price, type, location, hasElevator, color, size){
		this.productID = productID;
		this.title = title;
		this.address = address;
		this.description = description;
		this.sellerID = sellerID;
		this.price = price;
		this.elevation = elevation;
		this.hasElevator = hasElevator
		this.size = size
		if (!(color in productColors)){
			console.log(`product color ${color} not in allowed product colors ${JSON.stringify(productColors)}`);
		}
		// console.log( "couch" in productTypes)
		let arraylength = type.length;
		for (let i = 0; i < arraylength; i++){
			if (!(type[i] in productTypes)){
				console.log(`product type ${type[i]} not in allowed product types ${JSON.stringify(productTypes)}`);
			}
		}
		this.type = type;
		this.color = color
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
		let upperBoundedProducts = filterFactory.filterMethod(this.products, upper_bound, "pricelower");
		return filterFactory.filterMethod(upperBoundedProducts, lower_bound, "pricehigher");
	}

	returnFilteredProductsColor(color){
		return filterFactory.filterMethod(this.products, color, "color");
	}

	returnFilteredProductsSize(size){
		return filterFactory.filterMethod(this.products, size, "size");
	}

}

module.exports = { Product, ProductList };