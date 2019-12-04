import React, {Component} from 'react';
import './Landing.css';
import '../Home.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import arrowSvg from '../next.svg';

const options = [
  'All', 'Table', 'Bed', 'Seating', 'Storage'
]
const defaultOption = options[0];

export default class Landing extends Component {

    constructor(props) {
      super(props);
      this._onSelect = this._onSelect.bind(this);
      this._onClick = this._onClick.bind(this);
      this.value = defaultOption;
    }

    _onSelect(target) {
      this.value = target.value;
    }

    _onClick() {
      window.location = `/preference?type=${this.value.toLowerCase()}`;
    }

    render(){
        return (
            <div className="middle-home-container">
                <div className="Landing-Prompt"> What are you looking for? </div>
                <Dropdown onChange={this._onSelect} className='Landing-Options' options={options} value={defaultOption}/>
                <div className="landing-buttons-container">
                  <div onClick={this._onClick} className="landing-button-container">
                    <div className="landing-button">Next</div>
                    <img className="landing-button-arrow" src={arrowSvg} />
                  </div>
                </div>
            </div>
        )
    }
}
