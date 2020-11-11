import React from 'react';
import './BillPayEdit.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class BillPayTransaction extends React.Component {
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
    }

    componentDidMount() {
        console.log(typeof this.props.location.from_acct);
        console.log(typeof this.props.location.routing_num);
        console.log(typeof this.props.location.to_acct);
        console.log(typeof this.props.location.amount);
        console.log(typeof this.props.location.pay_date);
    }

    check(e) {
        const id = localStorage.getItem('bill_id')
        axiosInstance
          .post(`bill_payments/${id}/edit_bill_payment/`, {
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
            <div className="BillPayTransaction">
                <UserNavigationBar active={1} />
                <div className="billpay-headerDivTransaction">
                    <div
                        className="TransactionAlert"
                        class="alert alert-success"
                        role="alert"
                        id="billpaytransaction-ty"
                    >
                        <p>
                            Thank you for your transfer request! Please contact
                            us if you have any questions or concerns.
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
                    <button type="submit" class="btn btn-success" onClick={this.check}>
                        Show Bills
                    </button>
                </Link>
                <Link to="/userdashboard">
                    <button type="submit" class="btn btn-primary" onClick={this.check}>
                    Back to Dashboard
                    </button>
                </Link>
                </div>
            </div>
        );
    }
}

export default BillPayTransaction;
