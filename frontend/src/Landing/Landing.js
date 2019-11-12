import React, {Component} from 'react';
import './Landing.css';

import HeaderBuy from '../Header/HeaderBuy.js';
import FooterPictures from '../FooterPictures/FooterPictures.js';

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const options = [
  'Table', 'Desk', 'Chair', 'Bed'
]
const defaultOption = options[0];

export default class Landing extends Component {
    render(){
        return (
            <div>
                <HeaderBuy />
                <div className="Body-Prompt"> What are you looking for? </div>
                <Dropdown className='Options' options={options} value={defaultOption} placeholder="Select an option" />
                <div className="Click"> Next > </div>
                <FooterPictures />
            </div>
        )
    }
}