import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './page/login';
import store from './model/store';
import Test from './page/test';
import Five from './page/login/five';
import SpeedTest from './page/games/SpeedTest';

class Routers extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path='/' exact component={Login}  />
                        <Route path='/test' component={Test}/>
                        <Route path='/five' component={Five} />
                        <Route path='/dramaGame' component={SpeedTest} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default Routers;
