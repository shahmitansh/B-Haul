import React, {Component} from 'react';
import logo from '../BHaul.png';
import './Header.css';

export default class HeaderBuy extends Component {
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
              {console.log(this.props.display, 'display')}
              {this.props.display ?
                <div>
                  {/* <img className="User-Pic" src={(localStorage.getItem('facebookURL'))} alt="avatar"/> <br></br>   */}
                </div> :
                <div className="text-container">
                  <a  href="/listings"
                      className="Text Buy"
                      target="_self"
                      rel="noopener noreferrer"
                  >Looking to sell?</a>
                  <img className="User-Pic" src={(localStorage.getItem('facebookURL'))} alt="avatar"/> <br></br>
                </div>
              }
            </header>
        )
    }
}
