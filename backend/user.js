class User{
	
	/**
 	* Represents User object.
 	* @constructor
 	* @param {Number} userID - ID to represent unique User
 	* @param {String} email - Email listed for User
	* @param {String} firstName - First name listed for User
	* @param {String} lastName - Last name listed for User
	* @param {String} password - Password chosen by User
 	*/
	constructor(userID, email, firstName, lastName, password){
		this.userID = userID;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.buyerFunctionality = new BuyerFunctionality(userID); 
		this.sellerFunctionality = new SellerFunctionality(userID);

	}	
}

class BuyerFunctionality{
	
	/**
 	* Represents functions used by Buyers.
 	* @constructor
 	* @param {Number} userID - Unique ID of User we want to give access to Buyer functions
 	*/	
	constructor(userID){
		this.userID = userId
		this.saved = [];
	}
	
	/**
 	* Allows Buyer to add a Product to their list of saved items they are interested in purchasing.
	* @param {Product} product - Product object that a Buyer wishes to add to their list of saved items
 	*/
	addProduct(product){
		this.saved.push(product)
	}
	
	/**
 	* Allows Buyer to remove a Product from their list of saved items they are interested in purchasing.
	* @param {Number} productID - Unique ID of Product that the Buyer wishes to remove from their saved items list
 	*/
	removeProduct(productID){
		for (let i = 0; i < this.saved.length; i++){
			if (this.saved[i].productID == productID){
				this.saved.splice(i,1);
				console.log(`Successfully removed ${productID} from saved items`);
				break;
			}
		}
	}
}


class SellerFunctionality{
	/**
 	* Represents functions used by Sellers.
 	* @constructor
 	* @param {Number} userID - Unique ID of User we want to give access to Seller functions
 	*/
	constructor(userID){
		this.postings = [];
	}

	/**
 	* Allows Seller to add a Product to their list of items they are selling.
	* @param {Product} product - Product object that a Seller wishes to add to their items listed for sale
 	*/
	addListing(product){
		this.postings.push(product)
	}
	
	/**
 	* Allows Seller to remove a Product from their list of items they are selling.
	* @param {Number} productID - Unique ID of Product that the Seller wishes to remove from their items listed for sale
 	*/
	removeListing(productID){
		for (let i = 0; i < this.cart.length; i++){
			if (this.postings[i].productID == productID){
				this.postings.splice(i,1);
				console.log(`Successfully removed ${productID} from postings`);
				break;
			}
		}
	}	
}

module.exports = {User, BuyerFunctionality, SellerFunctionality}
