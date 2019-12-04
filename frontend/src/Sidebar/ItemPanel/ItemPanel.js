import React from 'react';
import './ItemPanel.css';
import backSvg from './back.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class ItemPanel extends React.Component {

  state = {
    value: localStorage.getItem('facebookEmail'),
    copied: false
  }

  backClicked = () => {
    this.props.hideItem();
  }

  render() {
    const properties = this.props.item.properties;
    Object.keys(properties).forEach(key => properties[key] == undefined || properties[key] == '' || properties[key] == null ? delete properties[key] : '');

    const propertyList = Object.keys(properties).map((pair) =>
      <div className="sidebar-property">
        <div className="sidebar-property-key">{pair}</div>
        <div className="sidebar-property-value">{pair == 'price' ? `$${properties[pair]}` : properties[pair]}</div>
      </div>
    );

    return (
      <div className="item-fullview-container">
        <div className="item-fullview-backbtn" onClick={this.backClicked}>
          <img src={backSvg} style={{height: '20px'}} />
          Back
        </div>
        <div className="item-fullview-image-container">
          <img className="item-fullview-image" src={this.props.item.imageURL} />
        </div>
        <div className="item-fullview-title">{this.props.item.title}</div>
        <div className="item-fullview-description">{this.props.item.description}</div>
        <div className="item-fullview-property-container">
          {propertyList}
        </div>
        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
          <button className="item-fullview-contact-seller">
            CONTACT SELLER
          </button>
        </CopyToClipboard>
        {this.state.copied && <div className="item-fullview-copied-label">Seller email copied to clipboard!</div>}
      </div>
    )
  }
}
