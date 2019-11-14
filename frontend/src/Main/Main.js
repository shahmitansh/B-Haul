import React, {Component} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link
} from 'react-router-dom';

import Landing from '../Landing/Landing.js';
import PreferencePage from '../PreferencePage/PreferencePage.js';
import MapView from '../MapView/MapView';

export default class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                      <Landing />
                    </Route>
                    <Route exact path='/preference'>
                      <PreferencePage />
                    </Route>
                    <Route exact path='/map'>
                      <MapView />
                    </Route>
                </Switch>
            </Router>
        )
    }
}
