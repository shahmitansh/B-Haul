import React, {Component} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link
} from 'react-router-dom';

import MapView from '../MapView/MapView';
import Home from '../Home/Home';
import Facebook from '../Facebook/Facebook.js';
import Listings from '../Listings/Listings.js';
import SellingPage from '../SellingPage/SellingPage.js';

export default class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                      <Facebook />
                    </Route>
                    <Route exact path='/landing'>
                      <Home pageMode='buy' pageType='landing' />
                    </Route>
                    <Route exact path='/preference' render={
                      location => (
                        <Home pageMode='buy' pageType='preference' location={location} />
                      )
                    }>
                    </Route>
                    <Route exact path='/map' render={location => (
                      <MapView location={location} userLat={this.props.userLat} userLng={this.props.userLng} />
                    )}>
                    </Route>
                    <Route exact path='/listings'>
                      <Listings />
                    </Route>
                    <Route exact path='/sell'>
                      <SellingPage />
                    </Route>
                </Switch>
            </Router>
        )
    }
}
