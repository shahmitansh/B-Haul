import React, {Component} from 'react';
import logo from '../BHaul.png';
import './Header.css';

export default class HeaderSell extends Component {
    render() {
        return (
            <header className="App-header">
              <div className="logo-container">
                <img src={logo} className="Logo" alt="logo" />
              </div>
              <div className="text-container">
                <a  href="/landing"
                    className="Text Buy"
                    target="_self"
                    rel="noopener noreferrer"
                >Looking to buy?</a>

              </div>
            </header>
        )
    }
}
