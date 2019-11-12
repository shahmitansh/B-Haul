import React, {Component} from 'react';
import logo from '../BHaul.png';
import './HeaderBuy.css';

export default class HeaderBuy extends Component {
    render() {
        return (
            <header className="App-header">
            <img src={logo} className="Logo" alt="logo" /> 
            <div className="Text Sell">  Looking to sell? </div>      
        </header>
        ) 
    }   
}