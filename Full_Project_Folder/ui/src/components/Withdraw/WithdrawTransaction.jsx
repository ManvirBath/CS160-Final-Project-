import React from 'react';
import './Withdraw.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class WithdrawTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status_response: localStorage.getItem('status_response'),
            alert_type: localStorage.getItem('alert_type'),
            from_acct:
                this.props.location.from_acct ||
                localStorage.getItem('from_acct'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
        };
    }

    componentDidMount() {
        console.log(this.state.from_acct);
        console.log(this.state.amount);
        // window.addEventListener('popstate', (event) => {
        //   if (event.state) {
        //     alert("Please press 'Go to Dashboard' button")
        //   }
        //  }, false);

        //  window.addEventListener("beforeunload", this._confirm);
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = this._backConfirm;
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this._confirm);
        window.onpopstate = () => {};
    }

    _backConfirm = async () => {
        let event = window.confirm('Cannot go back to submission page. ');
        if (event) {
            window.history.pushState(null, '', window.location.href);
        }
    };

    _confirm = (e) => {
        var confirmationMessage = 'o/';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    };

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return <Redirect to="managerdashboard" />;
        }

        return (
            <div className="WithdrawTransaction">
                <UserNavigationBar active={3} />
                <div className="withdraw-headerDivTransaction">
                    <div
                        className="TransactionAlert"
                        class={localStorage.getItem('alert_type')}
                        role="alert"
                        id="depositchecktransaction-ty"
                    >
                        <p>{localStorage.getItem('status_response')}</p>
                    </div>
                </div>
                <div className="withdraw-transactionInfo">
                    <h4>From: {this.state.from_acct}</h4>
                    <h4>Amount: ${this.state.amount}</h4>
                </div>
                <div className="withdraw-transactionbuttons">
                    <Link to="/userdashboard">
                        <button
                            type="submit"
                            class="btn btn-primary"
                            id="withdraw-backto-dash"
                        >
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default WithdrawTransaction;
