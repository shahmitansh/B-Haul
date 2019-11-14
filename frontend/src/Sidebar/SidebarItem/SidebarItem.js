import React from 'react';
import './SidebarItem.css';

class SidebarItem extends React.Component {
  render() {
    const properties = this.props.item.properties;

    const propertyList = Object.keys(properties).map((pair) =>
      <div className="sidebar-property">
        <div className="sidebar-property-key">{pair}</div>
        <div className="sidebar-property-value">{properties[pair]}</div>
      </div>
    );

    return (
      <div className="sidebar-item">
        <div className="sidebar-picture-container">
          <div className="sidebar-picture"></div>
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
