import React from 'react';
import './BillPayCancel.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class BillPayCancelTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status_response:
                "Thank you for your bill payment! Please contact us if you have any questions or concerns.",
            alert_type: "alert alert-success",
            to_acct: this.props.location.to_acct || localStorage.getItem('to_acct'),
            from_acct: this.props.location.from_acct || localStorage.getItem('from_acct'),
            routing_num: this.props.location.routing_num || localStorage.getItem('routing_num'),
            amount: this.props.location.amount || localStorage.getItem('amount'),
            pay_date: this.props.location.pay_date || localStorage.getItem('pay_date'),
            frequency: this.props.location.frequency || localStorage.getItem('frequency'),
        };
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        console.log(id);
        console.log(this.props.location.from_acct);
        console.log(this.props.location.routing_num);
        console.log(this.props.location.to_acct);
        console.log(this.props.location.amount);
        console.log(this.props.location.pay_date);

        window.history.pushState(null, "", window.location.href);
        window.onpopstate = this._backConfirm;
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this._confirm);
        window.onpopstate = () => { }
    }
  
    _backConfirm = async () => {
        let event = window.confirm("Cannot go back to submission page. ");
        if(event){
            window.history.pushState(null, "", window.location.href);
        }
    }
  
    _confirm = (e) => {
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return (
                <Redirect to="/managerdashboard" />
            )
        }

        return (
            <div className="BillPayCancelTransaction">
                <UserNavigationBar active={1} />
                <div className="billpay-headerDivTransaction">
                    <div
                        className="TransactionAlert"
                        class="alert alert-success"
                        role="alert"
                        id="billpaytransaction-ty"
                    >
                        <p>
                            Thank you for your cancellation of this bill
                            payment! Please contact us if you have any questions
                            or concerns.
                        </p>
                    </div>
                </div>
                <div className="billpay-transactionInfo">
                    <h4>Transfer From: {this.state.from_acct}</h4>
                    <h4>Pay bill to: {this.state.to_acct}</h4>
                    <h4>Routing number: {this.state.routing_num}</h4>
                    <h4>Amount: ${this.state.amount}</h4>
                    <h4>Bill payment date: {this.state.pay_date}</h4>
                    <h4>Frequency: One Time</h4>
                </div>
                <div className="billpay-transaction-buttons">
                    <Link to="/billpayshow">
                        <button type="submit" class="btn btn-success">
                            Show Bills
                        </button>
                    </Link>
                    <Link to="/userdashboard">
                        <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={this.check}
                        >
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BillPayCancelTransaction;
