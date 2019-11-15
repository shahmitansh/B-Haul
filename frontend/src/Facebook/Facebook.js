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
        <h1>Welcome {user.name}!</h1>
        <p>{ user.email }</p>
        <img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/> <br></br>
        <a  href="/landing"
            className="Preference-Pad Preference-Opts"
            target="_self"
            rel="noopener noreferrer"> Look for furniture! </a>
    </div>
    </>
  )
  
  export default class Facebook extends Component {
    state = {user:false}
    facebookResponse = (response) => { console.log( response ); this.setState( {...this.state, user: response } ) }
  
    render() {
      return (
        <div>
            <HeaderBuy />
                <div style={{ margin: "auto", textAlign: "center", paddingTop: "2em" }}>
                { this.state.user ? <UserScreen user={this.state.user}/> :
                    <LoginButton className = "Facebook" facebookResponse={this.facebookResponse}/>
                }
                </div>
            <FooterPictures />
        </div>
      )
    }
  }