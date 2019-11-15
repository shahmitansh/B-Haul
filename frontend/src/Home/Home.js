import React from 'react';
import './Home.css';

import Landing from './Landing/Landing';
import PreferencePage from './PreferencePage/PreferencePage';
import HeaderBuy from '../Header/HeaderBuy';
import HeaderSell from '../Header/HeaderSell';
import FooterPictures from '../FooterPictures/FooterPictures';

export default class Home extends React.Component {
  render() {
    const pageMode = this.props.mode; // 'buy' or 'sell'
    const pageType = this.props.type; // 'landing' or 'preference'

    return (
      <div id="home">
        {this.props.pageMode == 'buy' ? <HeaderBuy /> : <HeaderSell />}
        {this.props.pageType == 'landing' ? <Landing /> : <PreferencePage />}
        <FooterPictures />
      </div>
    );
  }
}
