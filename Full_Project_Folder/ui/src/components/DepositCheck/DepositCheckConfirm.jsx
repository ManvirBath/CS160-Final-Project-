import React from 'react';
import './DepositCheck.css';
import { Link } from 'react-router-dom';

class DepositCheckConfirm extends React.Component {
    render() {
        return (
            <div className="DepositCheckConfirm">
                <h1 className="PageHeader" class="jumbotron">
                    Confirm check deposit
                </h1>
                <h6 className="PageHeader2" class="lead">
                    Please confirm your details before submitting.
                </h6>
                <div className="details">
                    <h4>Deposit to: [insert account info]</h4>
                    <h4>Amount: [insert amount]</h4>
                    <h4>Memo: [insert memo]</h4>
                    <h4>Check file: [insert check image info]</h4>
                    <h4>[insert check image]</h4>
                </div>
                <div className="buttons">
                    <Link to="/depositcheck">
                        <button type="button" class="btn btn-warning">
                            Make Changes
                        </button>
                    </Link>
                    <Link to="/depositchecktransaction">
                        <button type="button" class="btn btn-primary">
                            Submit
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default DepositCheckConfirm;
