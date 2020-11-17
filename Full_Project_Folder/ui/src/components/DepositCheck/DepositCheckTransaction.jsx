import React from 'react';
import './DepositCheck.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class DepositCheckTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status_response: localStorage.getItem('status_response'),
            alert_type: localStorage.getItem('alert_type'),
            to_account:
                this.props.location.account ||
                localStorage.getItem('to_account'),
            to_account_num:
                this.props.location.to_account_num ||
                localStorage.getItem('to_account_num'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
            memo: this.props.location.memo || localStorage.getItem('memo'),
            check_image:
                this.props.location.check_image ||
                localStorage.getItem('check_image'),
        };
    }

    componentDidMount() {
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = this._backConfirm;
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this._confirm);
        window.onpopstate = () => { }
      }
    
    _backConfirm = async () => {
        let event = window.confirm("Cannot go back to submission page. ");
        if(event){
            window.history.pushState(null, "", window.location.href);
        }
    }

    _confirm = (e) => {
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
      
    render() {
        return (
            <div className="DepositCheckTransaction">
                <UserNavigationBar active={3} />
                <div
                    className="TransactionAlert"
                    class={localStorage.getItem('alert_type')}
                    role="alert"
                    id="depositchecktransaction-ty"
                >
                    <p>{localStorage.getItem('status_response')}</p>
                </div>
                <div className="depositchecktransaction-info">
                    <h4>Deposit to: {this.state.to_account_num}</h4>
                    <h4>Amount: {this.state.amount}</h4>
                    <h4>Memo: {this.state.memo}</h4>
                    <h4>Check file: {this.state.check_image}</h4>
                    <div className="deposit-check-transactions-buttons">
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
                            >
                                Back to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DepositCheckTransaction;
