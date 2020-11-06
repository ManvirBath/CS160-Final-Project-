import React from 'react';
import './BillPay.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class BillPayTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { 
        const id = localStorage.getItem('user_id')
        console.log(typeof this.props.location.from_acct)
        console.log(typeof this.props.location.routing_num)
        console.log(typeof this.props.location.to_acct)
        console.log(typeof this.props.location.amount)
        console.log(typeof this.props.location.pay_date)

        axiosInstance.post(`clients/${id}/create_bill_payment/`, {
            from_account_num: this.props.location.from_acct,
            routing_num: this.props.location.routing_num,
            to_account_num: this.props.location.to_acct,
            amount: this.props.location.amount,
            date: this.props.location.pay_date
        });
    }

    check() {}
    render() {
        return (
            <div className="BillPayTransaction">
                <UserNavigationBar />
                <div className="headerDivTransaction">
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
                <div className="transactionInfo">
                    <h4>From: {this.props.location.from_acct}</h4>
                    <h4>To: {this.props.location.to_acct}</h4>
                    <h4>Routing number: {this.props.location.routing_num}</h4>
                    <h4>Amount: {this.props.location.amount}</h4>
                    <h4>Bill payment date: {this.props.location.pay_date}</h4>
                </div>
                <div className="buttons">
                    <Link to="/billpay">
                        <button type="button" class="btn btn-success">
                            Pay another bill
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

export default BillPayTransaction;
