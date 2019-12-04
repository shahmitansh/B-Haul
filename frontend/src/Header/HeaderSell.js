import React, {Component} from 'react';
import logo from '../BHaul.png';
import './Header.css';

export default class HeaderSell extends Component {
    render() {
        return (
            <header className="App-header">
              <div className="logo-container">
                <a href="/map"
                    className="Text Buy"
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <img src={logo} className="Logo" alt="logo" />
                  </a>
              </div>
                <div className="text-container">
                  <a  href="/landing"
                      className="Text Buy"
                      target="_self"
                      rel="noopener noreferrer"
                  >Looking to buy?</a>
                  <img className="User-Pic" src={(localStorage.getItem('facebookURL'))} alt="avatar"/> <br></br>
                </div>
            </header>
        )
    }
}
