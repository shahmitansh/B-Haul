import React, {Component} from 'react';
import './Listings.css';

import HeaderSell from '../Header/HeaderSell.js';
import Bundle from './Bundle.js';
import addSvg from './add.svg';
import deleteSvg from './delete.svg';

export default class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          listings: []
        };
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

    componentDidMount() {
      fetch('https://bhaulucla.herokuapp.com/getProductList')
        .then(res => res.json())
        .then(result => {
          let fetchedListings = [];
          for (let id in result.products) {
            if (result.products[id].sellerID == localStorage.getItem('facebookID')) {
              fetchedListings.push(result.products[id]);
            }
          }
          this.setState({
            listings: fetchedListings
          })
        });
    }

    render() {
        const items = this.items;
        const bundle = this.bundles;
        const listingComponents = this.state.listings.map(listing => (
          <div className="listing-item-container">
            <div className="listing-item-name">{listing.name}</div>
            <a className="listing-item-delete" onClick={(target) => {
              fetch(`https://bhaulucla.herokuapp.com/deletePosting/${listing.productID}`, {
                method: 'DELETE'
              })
                .then(() => {
                  window.location.reload(false);
                });
            }}><img style={{width: '15px'}} src={deleteSvg} /></a>
          </div>
        ));

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
                                ><img className="plus-svg" src={addSvg} /></a>
                        </div>
                        <div className="listing-item">
                          {listingComponents}
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
                                ><img className="plus-svg" src={addSvg} /></a>
                        </div>
                        <div className="listing-item bundle-item">
                            <Bundle bundles={this.bundles}
                                    bundleClicked={this.state.bundleClicked}
                            />
                        {console.log(localStorage.getItem('facebookID'), 'facebookID')}
                        {/* {this.sampleBundle.title}  */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
