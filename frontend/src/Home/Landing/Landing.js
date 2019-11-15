import React, {Component} from 'react';
import './Landing.css';
import '../Home.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'Table', 'Desk', 'Bed', 'Chair'
]
const defaultOption = options[0];

export default class Landing extends Component {
    render(){
        return (
            <div className="middle-home-container">
                <div className="Landing-Prompt"> What are you looking for? </div>
                <Dropdown className='Landing-Options' options={options} value={defaultOption} />
                <div className="Landing-Click">
                    <a  href="/preference"
                        className="Landing-Color"
                        target="_self"
                        rel="noopener noreferrer"
                        > Next > </a>
                </div>
            </div>
        )
    }
}
