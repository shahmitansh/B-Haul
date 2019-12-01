import React, {Component} from 'react';
import './Landing.css';
import '../Home.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'All', 'Tables', 'Beds', 'Seating', 'Storage'
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
                <div className="Landing-Click">
                    <a  onClick={this._onClick}
                        className="Landing-Color"
                        > Next > </a>
                </div>
            </div>
        )
    }
}
