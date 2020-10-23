import React from "react";
import "./App.css";
import Login from "./components/Login";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import GMap from "./components/GMap";
import UserDashboard from "./components/UserDashboard";
import DepositCheck from "./components/DepositCheck";
import DepositCheckConfirm from "./components/DepositCheck/DepositCheckConfirm";
import DepositCheckTransaction from "./components/DepositCheck/DepositCheckTransaction";
import TransferInternal from "./components/Transfer/TransferInternal";
import TransferInternalConfirm from "./components/Transfer/TransferInternalConfirm";
import TransferInternalTransaction from "./components/Transfer/TransferInternalTransaction";
import TransferExternal from "./components/Transfer/TransferExternal";
import TransferExternalConfirm from "./components/Transfer/TransferExternalConfirm";
import TransferExternalTransaction from "./components/Transfer/TransferExternalTransaction";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dark: false };
  }
  render() {
    const { dark } = this.state;
    return (
      <div className={`App ${dark ? "dark" : ""}`}>
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
            <Route path="/userdashboard" component={UserDashboard} />
            <Route path="/depositcheck" component={DepositCheck} />
            <Route
              path="/depositcheckconfirm"
              component={DepositCheckConfirm}
            />
            <Route
              path="/depositchecktransaction"
              component={DepositCheckTransaction}
            />
            <Route path="/transferinternal" component={TransferInternal} />
            <Route
              path="/transferinternalconfirm"
              component={TransferInternalConfirm}
            />
            <Route
              path="/transferinternaltransaction"
              component={TransferInternalTransaction}
            />
            <Route path="/transferexternal" component={TransferExternal} />
            <Route
              path="/transferexternalconfirm"
              component={TransferExternalConfirm}
            />
            <Route
              path="/transferexternaltransaction"
              component={TransferExternalTransaction}
            />
            <Redirect from="*" to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
