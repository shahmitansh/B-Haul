import React from 'react';
import './SidebarItem.css';

import CircleLabel from './CircleLabel';

class SidebarItem extends React.Component {
  render() {
    const properties = this.props.item.properties;
    // console.log(properties, 'properties')
    Object.keys(properties).forEach(key => properties[key] === undefined ? delete properties[key] : '');

    const propertyList = Object.keys(properties).map((pair) =>
      <div className="sidebar-property">
        <div className="sidebar-property-key">{pair}</div>
        <div className="sidebar-property-value">{properties[pair]}</div>
      </div>
    );

    const imgPath = `${this.props.item.image}`;
    // console.log(imgPath);

    return (
      <div className="sidebar-item">
        <div className="sidebar-picture-container">
          <div className="sidebar-picture">
            <img height="100%" width="100%" src={imgPath} />
          </div>
          <CircleLabel number={this.props.index+1} />
        </div>
        <div className="sidebar-desc-container">
          <div className="sidebar-desc-title">{this.props.item.title}</div>
          <div className="sidebar-property-container">
            {propertyList}
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarItem
