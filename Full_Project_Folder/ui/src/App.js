import React from "react";
import "./App.css";
import axiosInstance from "./axios";
import Main from "./components/Main";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Recovery from "./components/Recovery";
import Register from "./components/Register/Register";
import EditProfile from "./components/EditProfile/EditProfile";
import GMap from "./components/GMap";
import UserDashboard from "./components/UserDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import DepositCheck from "./components/DepositCheck";
import DepositCheckConfirm from "./components/DepositCheck/DepositCheckConfirm";
import DepositCheckTransaction from "./components/DepositCheck/DepositCheckTransaction";
import TransferInternal from "./components/Transfer/TransferInternal";
import TransferInternalConfirm from "./components/Transfer/TransferInternalConfirm";
import TransferInternalTransaction from "./components/Transfer/TransferInternalTransaction";
import TransferExternal from "./components/Transfer/TransferExternal";
import TransferExternalConfirm from "./components/Transfer/TransferExternalConfirm";
import TransferExternalTransaction from "./components/Transfer/TransferExternalTransaction";
import BillPay from "./components/BillPay/BillPay";
import BillPayEdit from "./components/BillPayEdit/BillPayEdit";
import BillPayEditConfirm from "./components/BillPayEdit/BillPayEditConfirm";
import BillPayEditTransaction from "./components/BillPayEdit/BillPayEditTransaction";
import BillPayCancelConfirm from "./components/BillPayCancel/BillPayCancelConfirm";
import BillPayCancelTransaction from "./components/BillPayCancel/BillPayCancelTransaction";
import BillPayShow from "./components/BillPayShow/BillPayShow";
import BillPayConfirm from "./components/BillPay/BillPayConfirm";
import BillPayTransaction from "./components/BillPay/BillPayTransaction";
import Contact from "./components/Contact";
import Account from "./components/Account";
import OpenAccount from "./components/OpenAccount";
import CloseAccount from "./components/CloseAccount";
import NotFound from "./components/NotFound";
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
              path="/"
              render={(props) => <Main {...props} dark={dark} />}
            />
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/edit_profile" component={EditProfile} />

            <Route path="/recovery" component={Recovery} />
            <Route path="/gmap" component={GMap} />
            <Route path="/userdashboard" component={UserDashboard} />
            {<Route path="/managerdashboard" component={ManagerDashboard} />}
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
            <Route path="/billpay" component={BillPay} />
            <Route path="/billpayedit/:id" component={BillPayEdit} />
            <Route
              path="/billpayedit_confirm/:id"
              component={BillPayEditConfirm}
            />
            <Route
              path="/billpayedit_transaction/:id"
              component={BillPayEditTransaction}
            />

            <Route
              path="/billpaycancel_confirm/:id"
              component={BillPayCancelConfirm}
            />
            <Route
              path="/billpaycancel_transaction/:id"
              component={BillPayCancelTransaction}
            />

            <Route path="/billpayshow" component={BillPayShow} />
            <Route path="/billpayconfirm" component={BillPayConfirm} />
            <Route path="/billpaytransaction" component={BillPayTransaction} />
            <Route path="/account" component={Account} />
            <Route path="/open_account" component={OpenAccount} />
            <Route path="/contact" component={Contact} />
            <Route path="/openaccount" component={OpenAccount} />
            <Route path="/closeaccount" component={CloseAccount} />
            <Route path="/logout" component={Logout} />
            <Route path="/NotFound" component={NotFound} />
            <Redirect from="*" to="/NotFound" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
