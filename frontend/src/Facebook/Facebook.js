import React, {Component} from 'react';
import './Facebook.css';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import HeaderBuy from '../Header/HeaderBuy.js';
import FooterPictures from '../FooterPictures/FooterPictures.js';

const componentClicked = () => {
    console.log( "Clicked!" )
  }

  const LoginButton = ({facebookResponse}) => (
    <div className="Facebook">
        <FacebookLogin
      appId="448199699195984"
      // autoLoad
      fields="name,email,picture"
      onClick={componentClicked}
      callback={facebookResponse}
      icon="fa-facebook"/>
    </div>
    )


  const UserScreen = ({user}) => (
    <>
    <div className="User">
        <div className="User-Name">Hey {user.name}!</div>
        {/* {console.log(user.picture.data.url)} */}
        {/* <div className="User-Email">{ user.email }</div>
        <img className="User-Pic" src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/> <br></br> */}
        <a  href="/landing"
            className="Preference-Pad Preference-Opts"
            target="_self"
            rel="noopener noreferrer"> Get Searching! </a>
    </div>
    </>
  )

  export default class Facebook extends Component {
    state = {user:false, display:true}
    facebookResponse = (response) => {
      console.log( response );
      localStorage.setItem('facebookID', response.id);
      localStorage.setItem('facebookURL', response.picture.data.url);
      localStorage.setItem('facebookEmail', response.email);
      window.location = '/landing';
    }

    render() {
      return (
        <div className="fb-container">
            <HeaderBuy display={this.state.display}/>
                <div>
                { this.state.user && this.state.user.status != 'unknown' ?
                  <div style={{ margin: "auto", textAlign: "center", paddingTop: "2em" }}>
                    <UserScreen user={this.state.user}/>
                    {localStorage.setItem('facebookID', this.state.user.id)}
                    {localStorage.setItem('facebookURL', this.state.user.picture.data.url)}
                    {localStorage.setItem('facebookEmail', this.state.user.email)}
                    {console.log(localStorage.getItem('facebookID'), 'facebookID')}
                    {console.log(this.state.user.picture.data.url, "pic")}
                    {localStorage.setItem('facebookURL', this.state.user.picture.data.url)}
                    {console.log(localStorage.getItem('facebookURL'), 'facebookURL')}
                  </div>  :
                  <div>
                    <div className="Preference-Prompt"> Welcome to B-Haul </div>
                    <div className="Preference-Slogan"> Moving Furniture Never Got Easier </div>
                    <LoginButton className = "Facebook" facebookResponse={this.facebookResponse}/>
                  </div>
                }
                </div>
            <FooterPictures />
        </div>
      )
    }
  }
