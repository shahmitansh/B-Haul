let { filterMethod } = require("../filterFactory.js");

let chai = require('chai');
let should = chai.should();


describe('filterFactory', () => {
    describe('filterSize', () => {
        it('it should filter by size', () => {
            let orig = {"1": {"productID": 1, "size": "M"}, "2": {"productID": 2, "size": "L"}};
            filtered = filterMethod(orig, "M", "size");
            chai.assert.deepEqual(filtered, [{"productID": 1, "size": "M"}]);
        });

        it('it should filter by color', () => {
            let orig = {"1": {"productID": 1, "color": "black"}, "2": {"productID": 2, "color": "blue"}};
            filtered = filterMethod(orig, "black", "color");
            chai.assert.deepEqual(filtered, [{"productID": 1, "color": "black"}]);
        });

        it('it should filter by type', () => {
        	let orig = {
        		"1": {"productID": 1, "type": "table"}, // Single type, fits
        		"2": {"productID": 2, "type": "chair"}, // Single type, doesn't fit
        		"3": {"productID": 3, "type": ["table", "coffee_table"]}, // Multitype, fits
        		"4": {"productID": 4, "type": ["chair", "stool"]}, // Multitype, doesn't fit
        	};

        	filtered = filterMethod(orig, "table", "type");
        	chai.assert.deepEqual(filtered, [
        		{"productID": 1, "type": "table"}, 
        		{"productID": 3, "type": ["table", "coffee_table"]}
				]);
        });

        it('it should filter priceLower', () => {
            let orig = {"1": {"productID": 1, "price": 1}, "2": {"productID": 2, "price": 2}};
            filtered = filterMethod(orig, 1, "pricelower");
            chai.assert.deepEqual(filtered, [{"productID": 1, "price": 1}]);
        });

        it('it should filter priceHigher', () => {
            let orig = {"1": {"productID": 1, "price": 1}, "2": {"productID": 2, "price": 2}};
            filtered = filterMethod(orig, 2, "pricehigher");
            chai.assert.deepEqual(filtered, [{"productID": 2, "price": 2}]);
        });
    });
});
