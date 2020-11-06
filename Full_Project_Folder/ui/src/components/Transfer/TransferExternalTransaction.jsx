import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class TransferExternalTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAmountTransferrable: true,
        };
    }

    componentDidMount() {
        console.log(this.props.location.from_acct)
        console.log(this.props.location.to_acct)
        console.log(this.props.location.amount)
        console.log(this.props.location.memo)
        console.log(this.props.location.routing_num)

        axiosInstance.post(`accounts/${this.props.location.from_acct}/transfer_external/`, {
            amount: this.props.location.amount,
            location: "Online",
            routing_num: this.props.location.routing_num,
            to_account_num: this.props.location.to_acct,
            memo: this.props.location.memo
        });
    }
    check() {}
    render() {
        
        const { amount } = this.state;
        return (
            <div className="DepositCheckTransaction">
                <UserNavigationBar />
                <div className="headerDivTransaction">
                    <div
                        className="TransactionAlert"
                        class="alert alert-success"
                        role="alert"
                        id="external-transaction-ty"
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
                    <h4>Memo: {this.props.location.memo}</h4>
                </div>
                <div className="buttons">
                    <Link to="/userdashboard">
                        <button
                            type="button"
                            class="btn btn-primary"
                            id="external-transaction-backto-dash"
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

export default TransferExternalTransaction;
