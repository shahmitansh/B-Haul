import React from 'react';
import './Sidebar.css';

import SidebarItem from './SidebarItem/SidebarItem';

class Sidebar extends React.Component {
  render() {
    const sidebarItemList = this.props.items.map((item, index) =>
      <SidebarItem
        item={item}
        index={index}
      />
    );

    return (
      <div className="sidebar-container">
        {sidebarItemList}
      </div>
    );
  }
}

export default Sidebar;
