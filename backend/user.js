export class User{
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

export class BuyerFunctionality{
	constructor(userID){
		this.userID = userId
		this.saved = [];
	}
	addProduct(product){
		this.saved.push(product)
	}
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


export class SellerFunctionality{
	constructor(userID){
		this.postings = [];
	}

	addListing(product){
		this.postings.push(product)
	}
	removeListing(productID){
		for (let i = 0; i < this.cart.length; i++){
			if (this.postings[i].productID == productID){
				this.postings.splice(i,1);
				console.log(`Successfully removed ${productID} from postings`);
				break;
			}
		}	
}