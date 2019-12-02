
module.exports = {
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


function filterSize(products, size){
	let returnList = [];
	for (let key in products){
		if (products[key].size == size){
			returnList.push(products[key])
		}
	}
	return returnList;
}



function filterColor(products, color){
	if (color === 'all') {
		return products;
	}
	let returnList = [];
	for (let key in products){
		if (products[key].color == color){
			returnList.push(products[key])
		}
	}
	return returnList;
}


function filterType(products, type){
	if (type == 'all') {
		return products;
	}
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



function filterPriceLower(products, upperbound){
	let returnList = [];
	for (let key in products){
		if (products[key].price <= upperbound){
			returnList.push(products[key])
		}
	}
	return returnList;
}



function filterPriceHigher(products, lowerbound){
	let returnList = [];
	for (let key in products){
		if (products[key].price >= lowerbound){
			returnList.push(products[key])
		}
	}
	return returnList;
}
