import React from 'react';
import './BillPay.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class BillPayTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                    <h4>Transaction Number: [insert transaction number]</h4>
                    <h4>From: {this.props.location.from_acct}</h4>
                    <h6>New Balance: [insert new balance]</h6>
                    <h4>To: {this.props.location.to_acct}</h4>
                    <h4>Routing number: {this.props.location.routing_num}</h4>
                    <h4>Amount: {this.props.location.amount}</h4>
                    <h4>Bill payment date: {this.props.location.pay_date}</h4>
                    <h4>Frequency: {this.props.location.frequency}</h4>
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
