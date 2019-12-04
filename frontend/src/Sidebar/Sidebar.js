import React from 'react';
import './Sidebar.css';
import downArrow from './sort-down.svg';

import SidebarItem from './SidebarItem/SidebarItem';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import ItemPanel from './ItemPanel/ItemPanel';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {filtersVisible: false, itemVisible: false, currentItem: undefined};
  }

  handleClick() {
    this.setState(state => ({filtersVisible: !state.filtersVisible}));
  }

  showItem = (item) => {
    this.setState({
      currentItem: item,
      itemVisible: true
    });
  }

  hideItem = () => {
    this.setState({
      currentItem: undefined,
      itemVisible: false
    })
  }

  render() {
    const sidebarItemList = this.props.items.map((item, index) =>
      <div>
        <SidebarItem
          item={item}
          index={index}
          showItem={this.showItem}
        />
      </div>
    );

    return (
      <div className="sidebar-container">
        {this.state.itemVisible ?
          <ItemPanel item={this.state.currentItem} hideItem={this.hideItem} /> :
          <div className="sidebar-section-container">
            <span id="show-filter-header" onClick={this.handleClick}>
              <img style={{transform: this.state.filtersVisible ? 'rotate(180deg)' : ''}} className="sort-arrow" height="10px" src={downArrow} />
              {this.state.filtersVisible ? "Hide filters" : "Show filters"}
            </span>
            {this.state.filtersVisible ? <FiltersPanel globalFilters={this.props.globalFilters} localFilters={this.props.localFilters} /> : sidebarItemList}
          </div>}
      </div>
    );
  }
}

export default Sidebar;
