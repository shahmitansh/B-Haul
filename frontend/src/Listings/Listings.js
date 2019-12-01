import React, {Component} from 'react';
import './Listings.css';

import HeaderSell from '../Header/HeaderSell.js';
import Checkbox from './Checkbox.js';
import Bundle from './Bundle.js';

export default class Listings extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        listingInBundle : true,
        bundleClicked: true
    }

    sampleItem1 = {
        title: "Small Wooden Dining Table",
        index: 0,
        in_bundle: false
    }

    sampleItem2 = {
        title: "Wooden Dining Table",
        index: 1,
        in_bundle: false
    }

    sampleItem3 = {
        title: "Dining Table",
        index: 2,
        in_bundle: false
    }

    sampleItem4 = {
        title: "Table",
        index: 3,
        in_bundle: false
    }

    sampleBundle1 = {
        title: "Bundle 1",
        listings: [1, 2]
    }

    sampleBundle2 = {
        title: "Bundle 2"
    }

    items = [this.sampleItem1, this.sampleItem2, this.sampleItem3, this.sampleItem4];
    bundles = [this.sampleBundle1, this.sampleBundle2]

    render() {
        const items = this.items;
        const bundle = this.bundles;

        return (
            <div>
                <HeaderSell />
                <div className="status-listing">
                    <div className="divider">
                        <div className="listing-header">
                            <div className="listing-name"> Listings </div>
                            <a  href="/sell"
                                className="listing-add"
                                target="_self"
                                rel="noopener noreferrer"
                                > + </a>
                        </div>
                        <div className="listing-item">
                            <Checkbox items={this.items}
                                      inBundle={this.state.listingInBundle}
                            />
                        </div>
                    </div>
                    <div className="bundle-table">
                        <div className="bundle-header">
                            <div className="listing-name"> Bundles </div>
                            <a
                                // href="/sell"
                                className="listing-add"
                                target="_self"
                                rel="noopener noreferrer"
                                > + </a>
                        </div>
                        <div className="listing-item bundle-item">
                            <Bundle bundles={this.bundles}
                                    bundleClicked={this.state.bundleClicked}
                            />
                        {/* {this.sampleBundle.title}  */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
