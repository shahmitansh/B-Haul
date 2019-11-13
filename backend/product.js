const productTypes = {"Table": 1, "Bed": 2, "Chair": 3, "Couch": 4};

class Product {
	constructor(productID, name, address, description, sellerID, price, type, location){
		this.productID = productID;
		this.name = name;
		this.address = address;
		this.description = description;
		this.sellerID = sellerID;
		this.price = price;
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

	returnFilteredProducts(type){
		let returnList = [];
		for (let key in this.products){
			if (this.products[key].type == type){
				returnList.push(this.products[key])
			}
		}
		return returnList;
	}

}

module.exports = {Product, ProductList}