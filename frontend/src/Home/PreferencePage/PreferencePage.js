import React, {Component} from 'react';
import './PreferencePage.css';
import '../Home.css';

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
            <div className="middle-home-container">
                <div className="Preference-Prompt"> Any preference? </div>
                <div className="Preference-Options-Container">
                  <Dropdown className='Preference-Options' options={typeOptions} placeholder='Type'/>
                  <Dropdown className='Preference-Options' options={shapeOptions} placeholder='Shape' />
                </div>
                <div className="Preference-Click">
                    <a  href="/landing"
                        className="Preference-Pad Preference-Opts"
                        target="_self"
                        rel="noopener noreferrer"> Back </a>
                    <a  href="/map"
                        className="Preference-Pad Preference-Opts"
                        target="_self"
                        rel="noopener noreferrer"> Search </a>
                </div>
            </div>
        )
    }
}
