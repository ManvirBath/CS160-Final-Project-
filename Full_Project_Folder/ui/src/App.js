import React from 'react';
import './App.css';
import Login from './components/Login';
import Recovery from './components/Recovery';
import Register from './components/Register';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/recovery" component={Recovery} />
                    <Redirect from="*" to="/login" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
