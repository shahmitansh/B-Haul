import React from 'react';
import './Sidebar.css';

import SidebarItem from './SidebarItem/SidebarItem';
import SidebarDropdown from './SidebarItem/SidebarDropdown.js';

class Sidebar extends React.Component {
  render() {
    const sidebarItemList = this.props.items.map((item, index) =>
      <div>
        <SidebarItem
          item={item}
          index={index}
        />
        <SidebarDropdown 
          item={item}
          index={index}
        />
      </div>
    );

    return (
      <div className="sidebar-container">
        {sidebarItemList}
      </div>
    );
  }
}

export default Sidebar;
