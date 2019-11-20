import React, {Component} from 'react';
import './SellingPage.css';

import HeaderSell from '../Header/HeaderSell.js';

export default class SellingPage extends Component {
    render() {
        return (
            <div>
                <HeaderSell />
                <div> Selling Page </div>
            </div>
        );
    }
}