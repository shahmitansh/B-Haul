import React, {Component} from 'react';
import './PreferencePage.css';

import HeaderBuy from '../Header/HeaderBuy.js';
import FooterPictures from '../FooterPictures/FooterPictures.js';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const typeOptions = [
    'Dining', 'Coffee', 'Plastic'
]
const shapeOptions = [
    'Rectangular', 'Circular', 'Square'
]

export default class PreferencePage extends Component {
    render() {
        return(
            <div>
                <HeaderBuy />
                <div className="Preference-Prompt"> Any preference? </div>
                <Dropdown className='Preference-Options' options={typeOptions} placeholder='Type'/>
                <Dropdown className='Preference-Options' options={shapeOptions} placeholder='Shape' />
                <div className="Preference-Click">
                    <a  href="localhost:3000/"
                        className="Preference-Pad Preference-Opts"
                        target="_blank"
                        rel="noopener noreferrer"> Back </a>
                    <a  href="localhost:3000/map"
                        className="Preference-Opts"
                        target="_blank"
                        rel="noopener noreferrer"> Search </a>
                </div>
                <FooterPictures />
            </div>
        )
    }
}
