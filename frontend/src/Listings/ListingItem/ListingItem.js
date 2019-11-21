import React, {Component} from 'react';
import './ListingItem.css';

export default class ListingItem extends Component {
    render() {
        const items = this.props.items;

        return (
            <div className = "item-title"> {this.props.items.title} </div>
        );
    }
}