import React from 'react';
import './DepositCheck.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class DepositCheckTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axiosInstance.post('deposit/', {
            account: this.props.location.account,
            amount: this.props.location.amount,
            check_path: this.props.location.check_image,
            location: 'internal',
            memo: this.props.location.memo,
        });
    }
    render() {
        return (
            <div className="DepositCheckTransaction">
                <UserNavigationBar />
                <div
                    className="TransactionAlert"
                    class="alert alert-success"
                    role="alert"
                    id="depositchecktransaction-ty"
                >
                    <p>
                        Thank you for depositing your check! Please contact us
                        if you have any questions or concerns.
                    </p>
                </div>
                <div className="transactionInfo">
                    <h4>Deposit to: {this.props.location.account}</h4>
                    <h4>Amount: {this.props.location.amount}</h4>
                    <h4>Memo: {this.props.location.memo}</h4>
                    <h4>Check file: {this.props.location.check_image}</h4>
                </div>
                <div className="buttons">
                    <Link to="/depositcheck">
                        <button
                            type="button"
                            class="btn btn-success"
                            id="btn-depcheck"
                        >
                            Make Another Deposit
                        </button>
                    </Link>
                    <Link to="/userdashboard">
                        <button
                            type="button"
                            class="btn btn-primary"
                            id="btn-depcheck2"
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

export default DepositCheckTransaction;
