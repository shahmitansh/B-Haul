import React, {Component} from 'react';
import './Landing.css';

import HeaderBuy from '../Header/HeaderBuy.js';
import FooterPictures from '../FooterPictures/FooterPictures.js';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'Table', 'Desk', 'Bed', 'Chair'
]
const defaultOption = options[0];

export default class Landing extends Component {
    render(){
        return (
            <div>
                <HeaderBuy />
                <div className="Landing-Prompt"> What are you looking for? </div>
                <Dropdown className='Landing-Options' options={options} value={defaultOption} />
                <div className="Landing-Click">
                    <a  href="localhost:3000/preference"
                        className="Landing-Color"
                        target="_blank"
                        rel="noopener noreferrer"
                        > Next > </a>
                </div>
                <FooterPictures />
            </div>
        )
    }
}
