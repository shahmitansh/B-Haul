import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './SidebarDropdown.css';

class SidebarDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          setMoreInfo: false,
          setLessInfo: true,
          value: '',
          copied: false,
        };

        this._dropdownInfo = this._dropdownInfo.bind(this);
        this._lessDropdownInfo = this._lessDropdownInfo.bind(this);
    }

    _dropdownInfo(){
        const properties = this.props.item.properties;
        Object.keys(properties).forEach(key => properties[key] === undefined ? delete properties[key] : '');
    
        const propertyList = Object.keys(properties).map((pair) =>
          <div className="sidebar-property">
            <div className="sidebar-property-key">{pair}</div>
            <div className="sidebar-property-value">{properties[pair]}</div>
          </div>
        );
        this.setState(
            {
                setMoreInfo: propertyList,
                setLessInfo: false,
                value: 'test@test.com'
            }
        )
    }

    _lessDropdownInfo() {
        this.setState(
            {
                setMoreInfo: false,
                setLessInfo: true,
                value: ''
            }
        )
    }

    render() {
        return (
            <div className="sidebar-dropdown-container">
                {this.state.setLessInfo ? 
                    <div className="sidebar-dropdown sidebar-link" onClick={this._dropdownInfo}> More Info </div> :
                    <div className="sidebar-dropdown sidebar-link" onClick={this._lessDropdownInfo}> Less Info </div> 
                }
                {this.state.setMoreInfo ? 
                    <div className="sidebar-opts"> 
                        <div className="sidebar-col"> {this.state.setMoreInfo} </div>
                        <div className="sidebar-col">
                            <div className="sidebar-email"> Email if interested! </div>
                            <div>
                                <CopyToClipboard 
                                    text={this.state.value}
                                    onCopy={() => this.setState({copied: true})}
                                    className="sidebar-email sidebar-link"
                                >
                                    <div>Copy Email</div>
                                </CopyToClipboard>
                                {this.state.copied ? <div> {alert("Copied email!")} </div> : null}
                            </div>
                        </div>
                    </div> : 
                    <div> </div>
                }
            </div>
        );
    }
}

export default SidebarDropdown