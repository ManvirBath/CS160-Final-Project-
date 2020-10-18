import React from 'react';
import './App.css';
import Login from './components/Login';
import Recovery from './components/Recovery';
import Register from './components/Register';
import GMap from './components/GMap';
import UserDashboard from './components/UserDashboard';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dark: false };
    }
    render() {
        const { dark } = this.state;
        return (
            <div className={`App ${dark ? 'dark' : ''}`}>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={(props) => <Login {...props} dark={dark} />}
                        />
                        <Route path="/register" component={Register} />
                        <Route path="/recovery" component={Recovery} />
                        <Route path="/gmap" component={GMap} />
                        <Route
                            path="/userdashboard"
                            component={UserDashboard}
                        />
                        <Redirect from="*" to="/login" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
