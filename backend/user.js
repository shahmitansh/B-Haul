export class User{
	constructor(userID, email, firstName, lastName, password){
		this.userID = userID;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
	}	
}

export class Buyer extends User{
	constructor(userID, email, firstName, lastName, password){
		super(userID, email, firstName, lastName, password);
		this.cart = [];
	}
	addProduct(product){
		this.cart.push(product)
	}
	removeProduct(productID){
		for (let i = 0; i < this.cart.length; i++){
			if (this.cart[i].productID == productID){
				this.cart.splice(i,1);
				console.log(`Successfully removed ${productID} from cart`);
				break;
			}
		}
	}
}


export class Seller extends User{
	constructor(userID, email, firstName, lastName, password){
		super(userID, email, firstName, lastName, password);
		this.postings = [];
	}

	addListing(product){
		//TODO
	}
	removeListing(){
		//TODO
	}
}