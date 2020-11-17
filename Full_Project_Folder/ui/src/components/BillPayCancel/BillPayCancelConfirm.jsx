import React from 'react';
import './BillPayCancel.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
  } from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class BillPayCancelConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: window.location.pathname.split('/')[2] || localStorage.getItem('bill_id'),
            to_acct: this.props.location.to_acct || localStorage.getItem('to_acct'),
            from_acct: this.props.location.from_acct || localStorage.getItem('from_acct'),
            routing_num: this.props.location.routing_num || localStorage.getItem('routing_num'),
            amount: this.props.location.amount || localStorage.getItem('amount'),
            pay_date: this.props.location.pay_date || localStorage.getItem('pay_date'),
            frequency: this.props.location.frequency || localStorage.getItem('frequency'),
        };
    }

    async check(e) {
        const id = await localStorage.getItem('bill_id');
        
        const response = axiosInstance.post(`bill_payments/${id}/cancel_bill_payment/`)
          .catch((error) => {
            console.log(error.response.status);
            this.setState({ alert_type: "alert alert-danger" });
            this.setState({
              status_response:
                "ERROR: This was not a valid payment. Please try again.",
            });
          });
      }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return (
                <Redirect to="/managerdashboard" />
            )
        }

        return (
            <div className="BillPayCancel">
                <UserNavigationBar active={1} />
                <div className="billpay-headerDiv">
                    <div id="billpay-confirm-transfer">Cancel Bill Payment</div>
                    <div>
                        Are you sure you want to cancel this bill payment?
                    </div>
                </div>
                <div className="billpay-confirm-details">
                    <h4>Transfer From: {this.state.from_acct}</h4>
                    <h4>Pay bill to: {this.state.to_acct}</h4>
                    <h4>Routing number: {this.state.routing_num}</h4>
                    <h4>Amount: ${this.state.amount}</h4>
                    <h4>Bill payment date: {this.state.pay_date}</h4>
                    <h4>Frequency: One Time</h4>
                </div>
                <div className="billpay-buttons">
                    <Link
                        to={{
                            pathname: '/billpayshow',
                        }}
                    >
                        <button type="submit" class="btn btn-danger">
                            Go Back
                        </button>
                    </Link>
                    <Link
                        to={{
                            pathname: `/billpaycancel_transaction/${this.state.id}`,
                            from_acct: this.state.from_acct,
                            to_acct: this.state.to_acct,
                            routing_num: this.state.routing_num,
                            amount: this.state.amount,
                            pay_date: this.state.pay_date,
                            frequency: this.state.frequency,
                        }}
                    >
                        <button type="submit" class="btn btn-primary" onClick={this.check}>
                            Submit
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BillPayCancelConfirm;
