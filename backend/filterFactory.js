
module.exports = {
	filterMethod: function(products, param, method){
		if (method == "type" || method == "Type"){
			return filterType(products, param);
		} else if (method == "pricelower" || method == "PriceLower"){
			return filterPriceLower(products, param);
		}else if (method =="pricehigher" || method == "PriveHigher"){
			return filterPriceHigher(products, param);
		}
	}

}

function filterType(products, type){
	let returnList = [];
	console.log("in filter function")
	console.log(JSON.stringify(products))
	for (let key in products){
		console.log(key)
		if (products[key].type == type){
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




