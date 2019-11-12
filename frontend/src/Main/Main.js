import React, {Component} from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Landing from '../Landing/Landing.js';

export default class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Landing} />
                </Switch>
            </main>
        )
    }
}