import React, {Component} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link
} from 'react-router-dom';

import MapView from '../MapView/MapView';
import Home from '../Home/Home';

export default class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                      <Home pageMode='buy' pageType='landing' />
                    </Route>
                    <Route exact path='/preference'>
                      <Home pageMode='buy' pageType='preference' />
                    </Route>
                    <Route exact path='/map'>
                      <MapView userLat={this.props.userLat} userLng={this.props.userLng} />
                    </Route>
                </Switch>
            </Router>
        )
    }
}
