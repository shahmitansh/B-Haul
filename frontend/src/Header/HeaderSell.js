import React, {Component} from 'react';
import logo from '../BHaul.png';
import './HeaderSell.css';

export default class HeaderSell extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="Logo" alt="logo" /> 
                <div className="Text Buy">  Looking to buy? </div>      
            </header>
        )
    }
}