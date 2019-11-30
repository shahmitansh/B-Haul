import React, {Component} from 'react';
import './Listings.css';

const Bundles = ({items}) => (
    items.map((item) => {
        return <div> <div className="padding"> <input type="checkbox" class="check-with-label" id="idinput"/> <label class="label-for-check" for="idinput">{item.title}</label> </div></div>
    })
)

const BundleItem = ({items}) => (
    items.map((item) => {
        return <div className = "item-title"> {item.title} </div>
    })
)

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    pushItem = (top) => {
        console.log(this.props.bundles[0].listings, 'items')
        this.props.bundles[0].listings.push(top);
        console.log(this.props.bundles[0].listings, 'items')
    }

    render() {
        const items = this.props.bundles;
        // console.log(items[0].listings, 'items')
        // items[0].listings.push(5);
        // console.log(items[0].listings, 'items')
        return(
            <div> 
                {this.props.bundleClicked ? <Bundles items = {items} /> : <BundleItem items = {items} />}
            </div>
        );
    }
}