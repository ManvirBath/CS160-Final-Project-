import React from 'react';
import './BillPayCancel.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class BillPayCancelTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const id = window.location.pathname.split('/')[2];
        console.log(id);
        console.log(this.props.location.from_acct);
        console.log(this.props.location.routing_num);
        console.log(this.props.location.to_acct);
        console.log(this.props.location.amount);
        console.log(this.props.location.pay_date);

        axiosInstance.post(`bill_payments/${id}/cancel_bill_payment/`);
    }

    check() {}
    render() {
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
                    <h4>From: {this.props.location.from_acct}</h4>
                    <h4>To: {this.props.location.to_acct}</h4>
                    <h4>Routing number: {this.props.location.routing_num}</h4>
                    <h4>Amount: {this.props.location.amount}</h4>
                    <h4>Bill payment date: {this.props.location.pay_date}</h4>
                    <h4>Frequency: One Time</h4>
                </div>
                <div className="billpay-transaction-buttons">
                    <Link to="/billpayshow">
                        <button type="button" class="btn btn-success">
                            Show Bills
                        </button>
                    </Link>
                    <Link to="/userdashboard">
                        <button
                            type="button"
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
