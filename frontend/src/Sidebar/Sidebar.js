import React from 'react';
import './Sidebar.css';

import SidebarItem from './SidebarItem/SidebarItem';

class Sidebar extends React.Component {
  render() {
    const sidebarItemList = this.props.items.map((item) =>
      <SidebarItem
        item={item}
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
