import React, {Component} from 'react';
import './PreferencePage.css';
import '../Home.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import arrowSvg from '../next.svg';
import queryString from 'query-string';

const seatingOptions = [
  'All', 'Chair', 'Stool', 'Couch', 'Bench', 'Other'
];

const bedOptions = [
  'All', 'TwinXL', 'Full', 'Queen', 'King', 'California King', 'Other'
];

const storageOptions = [
  'All', 'Bookshelf', 'Cabinet/Cupboard', 'Dresser/Drawer', 'Wardrobe', 'Other'
];

const tableOptions = [
  'All', 'Desk', 'Coffee Table', 'Dining Table', 'Folding Table', 'TV Table', 'Nightstand', 'Other'
];

export default class PreferencePage extends Component {

  constructor(props) {
    super(props);
    const params = queryString.parse(this.props.location.location.search);
    if ('type' in params) {
      this.type = params.type;
    } else {
      window.location = '/map';
    }
    this.state = {
      key: this.type == 'bed' ? 'size' : 'category',
      value: 'All'
    }
  }

  _nextClicked = (target) => {
    window.location = `/map?type=Table&_category=${this.state.value}`;
  }

  _prevClicked = (target) => {
    window.location = '/landing';
  }

  render() {
      let typeOptions = [];
      let keyName = '';

      if (this.type == 'table') {
        typeOptions = tableOptions;
        keyName = 'category';
      } else if (this.type == 'seating') {
        typeOptions = seatingOptions;
        keyName = 'category';
      } else if (this.type == 'bed') {
        typeOptions = bedOptions;
        keyName = 'size';
      } else if (this.type == 'storage') {
        typeOptions = storageOptions;
        keyName = 'category';
      } else {
        window.location = '/map';
      }

      return(
          <div className="middle-home-container">
              <div className="Preference-Prompts"> Any preference? </div>
              <div className="Preference-Options-Container">
                <Dropdown className='Preference-Options' options={typeOptions} value={this.state.value} onChange={(target) => this.setState({value: target.value, key: keyName})} />
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
