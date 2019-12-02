
module.exports = {
	
	/**
 	* Returns a list of Products filtered based on Buyer input.
	* @param {ProductList} products - ProductList containing all the products
	* @param {string} param - Describes the parameter chosen for the filter method
	* @param {string} method - Describes the filter method
	* @return {Product[]} - An array of Products filtered based on the param and method
 	*/
	filterMethod: function(products, param, method){
		if (method == "type" || method == "Type"){
			return filterType(products, param);
		} else if (method == "pricelower" || method == "PriceLower"){
			return filterPriceLower(products, param);
		}else if (method =="pricehigher" || method == "PriceHigher"){
			return filterPriceHigher(products, param);
		}else if (method == "color"){
			return filterColor(products, param)
		}else if (method == "size"){
			return filterSize(products, param)
		}
	}

}

/**
 * Returns a list of Products filtered by size.
* @param {ProductList} products - List of products to be filtered
* @param {String} size - Size parameter specified by Buyer
* @return {Product[]} - An array of Products filtered by size
 */
function filterSize(products, size){
	let returnList = [];
	for (let key in products){
		if (products[key].size == size){
			returnList.push(products[key])
		}
	}
	return returnList;
}


/**
 * Returns a list of Products filtered by color.
* @param {ProductList} products - List of products to be filtered
* @param {String} color - Color parameter specified by Buyer
* @return {Product[]} - An array of Products filtered by color
 */
function filterColor(products, color){
	let returnList = [];
	for (let key in products){
		if (products[key].color == color){
			returnList.push(products[key])
		}
	}
	return returnList;
}

/**
 * Returns a list of Products filtered by type.
* @param {ProductList} products - List of products to be filtered
* @param {String} type - Type parameter specified by Buyer
* @return {Product[]} - An array of Products filtered by color
 */
function filterType(products, type){
	let returnList = [];
	// console.log("in filter function")
	// console.log(JSON.stringify(products))
	for (let key in products){
		if (Array.isArray(products[key].type) && products[key].type.includes(type)){
			returnList.push(products[key])

		}else if (products[key].type == type){
			returnList.push(products[key])
		}
	}
	return returnList;
}


/**
 * Returns a list of Products filtered by price based on a maximum.
* @param {ProductList} products - List of products to be filtered
* @param {String} upperbound - Uppderbound parameter specified by Buyer
* @return {Product[]} - An array of Products filtered by price based on a maximum
 */
function filterPriceLower(products, upperbound){
	let returnList = [];
	for (let key in products){
		if (products[key].price <= upperbound){
			returnList.push(products[key])
		}
	}
	return returnList;
}


/**
 * Returns a list of Products filtered by price based on a minumum.
* @param {ProductList} products - List of products to be filtered
* @param {String} lowerbound - Lowerbound parameter specified by Buyer
* @return {Product[]} - An array of Products filtered by price based on a minumum
 */
function filterPriceHigher(products, lowerbound){
	let returnList = [];
	for (let key in products){
		if (products[key].price >= lowerbound){
			returnList.push(products[key])
		}
	}
	return returnList;
}




