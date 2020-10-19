import React from "react";
import "./App.css";
import Login from "./components/Login";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import GMap from "./components/Gmap";
import DepositCheck from "./components/DepositCheck";
import DepositCheckConfirm from "./components/DepositCheck/DepositCheckConfirm";
import DepositCheckTransaction from "./components/DepositCheck/DepositCheckTransaction";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dark: false };
    this.darkMode.bind(this);
  }
  darkMode() {
    this.setState((state) => {
      return {
        dark: !state.dark,
      };
    });
  }
  render() {
    const { dark } = this.state;
    return (
      <div className={`App ${dark ? "dark" : ""}`}>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            onChange={this.darkMode}
            id="darkmode"
          />
          <label className="custom-control-label" htmlFor="darkmode">
            Go {dark ? "light" : "dark"}
          </label>
        </div>
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
            <Route path="/depositcheck" component={DepositCheck} />
            <Route
              path="/depositcheckconfirm"
              component={DepositCheckConfirm}
            />
            <Route
              path="/depositchecktransaction"
              component={DepositCheckTransaction}
            />
            <Redirect from="*" to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
