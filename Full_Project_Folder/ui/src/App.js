import React from 'react';
import './App.css';
import axiosInstance from './axios';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import Recovery from './components/Recovery';
import Register from './components/Register/Register';
import EditProfile from './components/EditProfile/EditProfile';
import GMap from './components/GMap';
import UserDashboard from './components/UserDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import DepositCheck from './components/DepositCheck';
import DepositCheckConfirm from './components/DepositCheck/DepositCheckConfirm';
import DepositCheckTransaction from './components/DepositCheck/DepositCheckTransaction';
import TransferInternal from './components/Transfer/TransferInternal';
import TransferInternalConfirm from './components/Transfer/TransferInternalConfirm';
import TransferInternalTransaction from './components/Transfer/TransferInternalTransaction';
import TransferExternal from './components/Transfer/TransferExternal';
import TransferExternalConfirm from './components/Transfer/TransferExternalConfirm';
import TransferExternalTransaction from './components/Transfer/TransferExternalTransaction';
import BillPay from './components/BillPay/BillPay';
import BillPayEdit from './components/BillPayEdit/BillPayEdit';
import BillPayEditConfirm from './components/BillPayEdit/BillPayEditConfirm';
import BillPayEditTransaction from './components/BillPayEdit/BillPayEditTransaction';
import BillPayCancelConfirm from './components/BillPayCancel/BillPayCancelConfirm';
import BillPayCancelTransaction from './components/BillPayCancel/BillPayCancelTransaction';
import BillPayShow from './components/BillPayShow/BillPayShow';
import BillPayConfirm from './components/BillPay/BillPayConfirm';
import BillPayTransaction from './components/BillPay/BillPayTransaction';
import Contact from './components/Contact';
import Account from './components/Account';
import OpenAccount from './components/OpenAccount';
import CloseAccount from './components/CloseAccount';
import NotFound from './components/NotFound';
import Withdraw from './components/Withdraw';
import WithdrawConfirm from './components/Withdraw/WithdrawConfirm';
import WithdrawTransaction from './components/Withdraw/WithdrawTransaction';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoggedInRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem('email') != null ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

function LoggedOutRoute({ component: Component, ...rest }) {
    return (
        <Route
            render={(props) =>
                localStorage.getItem('email') == null ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/userdashboard" />
                )
            }
        />
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dark: false };
    }

    componentDidUpdate() {
        console.log('APP: ' + localStorage.getItem('user_id'));
    }
    render() {
        const { dark } = this.state;
        return (
            <div className={`App ${dark ? 'dark' : ''}`}>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => <Main {...props} dark={dark} />}
                        />
                        <LoggedOutRoute path="/main" component={Main} />
                        <LoggedOutRoute path="/login" component={Login} />
                        <LoggedOutRoute path="/register" component={Register} />
                        <LoggedInRoute
                            path="/editprofile"
                            component={EditProfile}
                        />

                        <LoggedOutRoute path="/recovery" component={Recovery} />
                        <Route path="/gmap" component={GMap} />
                        <LoggedInRoute
                            path="/userdashboard"
                            component={UserDashboard}
                        />
                        {
                            <LoggedInRoute
                                path="/managerdashboard"
                                component={ManagerDashboard}
                            />
                        }
                        <LoggedInRoute
                            path="/depositcheck"
                            component={DepositCheck}
                        />
                        <LoggedInRoute
                            path="/depositcheckconfirm"
                            component={DepositCheckConfirm}
                        />
                        <LoggedInRoute
                            path="/depositchecktransaction"
                            component={DepositCheckTransaction}
                        />
                        <LoggedInRoute
                            path="/transferinternal"
                            component={TransferInternal}
                        />
                        <LoggedInRoute
                            path="/transferinternalconfirm"
                            component={TransferInternalConfirm}
                        />
                        <LoggedInRoute
                            path="/transferinternaltransaction"
                            component={TransferInternalTransaction}
                        />
                        <LoggedInRoute
                            path="/transferexternal"
                            component={TransferExternal}
                        />
                        <LoggedInRoute
                            path="/transferexternalconfirm"
                            component={TransferExternalConfirm}
                        />
                        <LoggedInRoute
                            path="/transferexternaltransaction"
                            component={TransferExternalTransaction}
                        />
                        <LoggedInRoute path="/billpay" component={BillPay} />
                        <LoggedInRoute
                            path="/billpayedit/:id"
                            component={BillPayEdit}
                        />
                        <LoggedInRoute
                            path="/billpayedit_confirm/:id"
                            component={BillPayEditConfirm}
                        />
                        <LoggedInRoute
                            path="/billpayedit_transaction/:id"
                            component={BillPayEditTransaction}
                        />

                        <LoggedInRoute
                            path="/billpaycancel_confirm/:id"
                            component={BillPayCancelConfirm}
                        />
                        <LoggedInRoute
                            path="/billpaycancel_transaction/:id"
                            component={BillPayCancelTransaction}
                        />

                        <LoggedInRoute
                            path="/billpayshow"
                            component={BillPayShow}
                        />
                        <LoggedInRoute
                            path="/billpayconfirm"
                            component={BillPayConfirm}
                        />
                        <LoggedInRoute
                            path="/billpaytransaction"
                            component={BillPayTransaction}
                        />
                        <LoggedInRoute path="/withdraw" component={Withdraw} />
                        <LoggedInRoute
                            path="/withdrawconfirm"
                            component={WithdrawConfirm}
                        />
                        <LoggedInRoute
                            path="/withdrawtransaction"
                            component={WithdrawTransaction}
                        />
                        <LoggedInRoute path="/account" component={Account} />
                        <LoggedInRoute
                            path="/open_account"
                            component={OpenAccount}
                        />
                        <Route path="/contact" component={Contact} />
                        <LoggedInRoute
                            path="/openaccount"
                            component={OpenAccount}
                        />
                        <LoggedInRoute
                            path="/closeaccount"
                            component={CloseAccount}
                        />
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
