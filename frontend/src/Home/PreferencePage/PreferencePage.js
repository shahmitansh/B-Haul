import React, {Component} from 'react';
import './PreferencePage.css';
import '../Home.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const typeOptions = [
    'All', 'Desk', 'Coffee Table', 'Dining Table', 'Folding Table', 'TV Table', 'Nightstand', 'Other'
]

export default class PreferencePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: typeOptions[0]
    }
  }

  _nextClicked = (target) => {
    window.location = `/map?type=Table&_category=${this.state.value}`;
  }

  render() {
      return(
          <div className="middle-home-container">
              <div className="Preference-Prompts"> Any preference? </div>
              <div className="Preference-Options-Container">
                <Dropdown className='Preference-Options' options={typeOptions} value={this.state.value} onChange={(target) => this.setState({value: target.value})} />
              </div>
              <div className="Preference-Click">
                  <a  href="/landing"
                      className="Preference-Pads Preference-Opt"
                      target="_self"
                      rel="noopener noreferrer"> Back </a>
                  <a  onClick={this._nextClicked}
                      className="Preference-Opt"
                      target="_self"
                      rel="noopener noreferrer"> Search </a>
              </div>
          </div>
      )
  }
}
