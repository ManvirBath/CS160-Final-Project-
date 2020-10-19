import React from 'react';
import './DepositCheck.css';
import { Link } from 'react-router-dom';

class DepositCheckTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="DepositCheckTransaction">
                <div
                    className="TransactionAlert"
                    class="alert alert-success"
                    role="alert"
                >
                    <p>
                        Thank you for depositing your check! Your transtion
                        number for this deposit is [insert transaction number
                        here]. Please contact us if you have any questions or
                        concerns.
                    </p>
                </div>
                <div className="transactionInfo">
                    <h4>Transaction Number: [insert transaction number]</h4>
                    <h4>Deposit to: [insert account info]</h4>
                    <h4>Amount: [insert amount]</h4>
                    <h4>Memo: [insert memo]</h4>
                </div>
                <div className="buttons">
                    <Link to="/depositcheck">
                        <button type="button" class="btn btn-success">
                            Make Another Deposit
                        </button>
                    </Link>
                    <Link to="/userdashboard">
                        <button type="button" class="btn btn-primary">
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default DepositCheckTransaction;
