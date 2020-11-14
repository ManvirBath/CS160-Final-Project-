import React from 'react';
import './BillPay.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from "../../axios";

class BillPayConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: this.props.location.to_acct || localStorage.getItem('to_acct'),
            from_acct: this.props.location.from_acct || localStorage.getItem('from_acct'),
            routing_num: this.props.location.routing_num || localStorage.getItem('routing_num'),
            amount: this.props.location.amount || localStorage.getItem('amount'),
            pay_date: this.props.location.pay_date || localStorage.getItem('pay_date'),
            frequency: this.props.location.frequency || localStorage.getItem('frequency'),
        };

        this.check = this.check.bind(this)
    }

    async check(e) {
        const id = localStorage.getItem('user_id')
        const res = await axiosInstance
          .post(`clients/${id}/create_bill_payment/`, {
            from_account_num: this.state.from_acct,
            routing_num: this.state.routing_num,
            to_account_num: this.state.to_acct,
            amount: this.state.amount,
            date: this.state.pay_date,
          })
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
        return (
            <div className="BillPayConfirm">
                <UserNavigationBar active={1} />
                <div className="billpay-headerDiv">
                    <div id="billpay-confirm-transfer">Confirm Transfer</div>
                    <div>Please confirm your details before submitting.</div>
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
                    <Link to="/billpay">
                        <button type="button" class="btn btn-danger">
                            Go Back
                        </button>
                    </Link>
                    <Link
                        to={{
                            pathname: '/billpaytransaction',
                            from_acct: this.state.from_acct,
                            to_acct: this.state.to_acct,
                            routing_num: this.state.routing_num,
                            amount: this.state.amount,
                            pay_date: this.state.pay_date,
                            frequency: this.state.frequency,
                        }}
                    >
                        <button type="button" class="btn btn-primary" onClick={this.check}>
                            Submit
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BillPayConfirm;
