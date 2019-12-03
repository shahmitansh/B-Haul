import React, {Component} from 'react';
import './PreferencePage.css';
import '../Home.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import arrowSvg from '../next.svg';

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

  _prevClicked = (target) => {
    window.location = '/landing';
  }

  render() {
      return(
          <div className="middle-home-container">
              <div className="Preference-Prompts"> Any preference? </div>
              <div className="Preference-Options-Container">
                <Dropdown className='Preference-Options' options={typeOptions} value={this.state.value} onChange={(target) => this.setState({value: target.value})} />
              </div>

              <div className="landing-buttons-container">
                <div onClick={this._prevClicked} className="landing-button-container">
                  <img className="landing-button-arrow-left" src={arrowSvg} />
                  <div className="landing-button">Back</div>
                </div>
                <div onClick={this._nextClicked} className="landing-button-container">
                  <div className="landing-button">Next</div>
                  <img className="landing-button-arrow" src={arrowSvg} />
                </div>
              </div>
          </div>
      )
  }
}
