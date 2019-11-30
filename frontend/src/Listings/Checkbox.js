import React, {Component} from 'react';
import './Listings.css';

const Listing = ({items}) => (
    items.map((item) => {
        return <div> <div className="padding"> <input type="checkbox" class="check-with-label" id="idinput" /> <label class="label-for-check" for="idinput">{item.title}</label> </div></div>
    })
)

const ListingItem = ({items}) => (
    items.map((item) => {
        return <div className = "item-title"> {item.title} </div>
    })
)

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.listingInBundle = false;
    }

    render() {
        const items = this.props.items;

        return(
            <div> 
                {this.props.inBundle ? <Listing items = {items} /> : <ListingItem items = {items} />}
            </div>
        );
    }
}