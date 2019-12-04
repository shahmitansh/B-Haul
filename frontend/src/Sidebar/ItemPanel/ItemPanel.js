import React from 'react';
import './ItemPanel.css';

export default class ItemPanel extends React.Component {

  backClicked = () => {
    this.props.hideItem();
  }

  render() {
    return (
      <div className="item-fullview-container">
        <div className="item-fullview-backbtn" onClick={this.backClicked}>Back</div>
        <div className="item-fullview-title">{this.props.item.title}</div>
        <div className="item-fullview-description">{this.props.item.description}</div>
      </div>
    )
  }
}
