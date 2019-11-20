import React, {Component} from 'react';
import './Listings.css';

import HeaderSell from '../Header/HeaderSell.js';

export default class Listings extends Component {
    render() {
        return (
            <div>
                <HeaderSell />
                <div> Listing Page </div>
            </div>
        );
    }
}