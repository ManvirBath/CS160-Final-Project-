import React from 'react';
import './BillPay.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class BillPayConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="BillPayConfirm">
                <UserNavigationBar />
                <div className="headerDiv">
                    <h1 className="PageHeader" id="confirm-trans">
                        Confirm transfer
                    </h1>
                    <h6
                        className="PageHeader2"
                        class="lead"
                        id="billpayconfirm-detail"
                    >
                        Please confirm your details before submitting.
                    </h6>
                </div>
                <div className="details">
                    <h4>Transfer From: {this.props.location.from_acct}</h4>
                    <h4>Pay bill To: {this.props.location.to_acct}</h4>
                    <h4>Routing number: {this.props.location.routing_num}</h4>
                    <h4>Amount: {this.props.location.amount}</h4>
                    <h4>Bill payment date: {this.props.location.pay_date}</h4>
                    <h4>Frequency: {this.props.location.frequency}</h4>
                </div>
                <div className="buttons">
                    <Link to="/billpay">
                        <button type="button" class="btn btn-danger">
                            Go Back
                        </button>
                    </Link>
                    <Link
                        to={{
                            pathname: '/billpaytransaction',
                            from_acct: this.props.location.from_acct,
                            to_acct: this.props.location.to_acct,
                            routing_num: this.props.location.routing_num,
                            amount: this.props.location.amount,
                            pay_date: this.props.location.pay_date,
                            frequency: this.props.location.frequency,
                        }}
                    >
                        <button type="button" class="btn btn-primary">
                            Submit
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BillPayConfirm;
