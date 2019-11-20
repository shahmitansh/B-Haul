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
                <a  href="/sell"
                    className="Text Buy"
                    target="_self"
                    rel="noopener noreferrer"
                >Looking to sell?</a>
              </div>
            </header>
        )
    }
}
