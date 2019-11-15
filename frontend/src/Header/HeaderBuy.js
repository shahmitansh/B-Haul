import React, {Component} from 'react';
import logo from '../BHaul.png';
import './Header.css';

export default class HeaderBuy extends Component {
    render() {
        return (
            <header className="App-header">
              <div className="logo-container">
                <img src={logo} className="Logo" alt="logo" />
              </div>
              <div className="text-container">
                <div className="Text Sell">Looking to sell?</div>
              </div>
            </header>
        )
    }
}
