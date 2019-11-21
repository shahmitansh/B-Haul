import React, {Component} from 'react';
import './Listings.css';

import HeaderSell from '../Header/HeaderSell.js';
import ListingItem from './ListingItem/ListingItem.js';

export default class Listings extends Component {
    sampleItem1 = {
        title: "Small Wooden Dining Table"
    }

    sampleItem2 = {
        title: "Wooden Dining Table"
    }

    sampleItem3 = {
        title: "Dining Table"
    }

    sampleItem4 = {
        title: "Table"
    }

    items = [this.sampleItem1, this.sampleItem2, this.sampleItem3, this.sampleItem4];

    render() {
        const items = this.items;
        const listingItems = items.map((item, index) => 
            <ListingItem 
                items={item}
                index={index}
            />
        );

        return (
            <div>
                <HeaderSell />
                <div className="status-listing">
                    <div className="status-table">
                        <div className="status-item"> 
                            Active 
                        </div>
                        <div className="status-item"> Sold </div>
                        <div className="status-item"> Inactive </div>   
                    </div>
                    <div className="listing-table">
                        <div className="listing-header">
                            <div className="listing-name"> Listings </div> 
                            <a  href="/sell"
                                className="listing-add"
                                target="_self"
                                rel="noopener noreferrer" 
                                > + </a>
                        </div>
                        <div className="listing-item"> {listingItems} </div>
                    </div>
                </div>
            </div>
        );
    }
}