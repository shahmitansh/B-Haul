import React from 'react';
import './SidebarItem.css';

class CircleLabel extends React.Component {
  render() {
    return (
      <div className="circle-label">
        <svg viewBox="0 0 40 40" height="40px" width="40px">
          <g>
            <circle style={{fill:"white"}} cx="20" cy="20" r="20"></circle>
            <circle style={{fill:"#d00"}} cx="20" cy="20" r="15"></circle>
            <text className="label-text" x="50%" y="50%" textAnchor="middle" dy=".3em">{this.props.number}</text>
          </g>
        </svg>
      </div>
    );
  }
}

export default CircleLabel;
