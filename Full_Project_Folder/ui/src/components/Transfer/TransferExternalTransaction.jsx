import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class TransferExternalTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAmountTransferrable: true,
        };
    }

    check() {}
    render() {
        const { amount } = this.state;
        return (
            <div className="DepositCheckTransaction">
                <UserNavigationBar active={2} />
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
                    <h6>New Balance: [insert new balance]</h6>
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
