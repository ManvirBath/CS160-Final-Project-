import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class TransferExternalTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status_response: localStorage.getItem('status_response'),
            alert_type: localStorage.getItem('alert_type'),
            to_acct:
                this.props.location.to_acct || localStorage.getItem('to_acct'),
            from_acct:
                this.props.location.from_acct ||
                localStorage.getItem('from_acct'),
            routing_num:
                this.props.location.routing_num ||
                localStorage.getItem('routing_num'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
            memo: this.props.location.memo || localStorage.getItem('memo'),
        };
    }

    componentDidMount() {
        console.log(this.props.location.from_acct);
        console.log(this.props.location.to_acct);
        console.log(this.props.location.amount);
        console.log(this.props.location.memo);
        console.log(typeof parseInt(this.props.location.routing_num));

        window.history.pushState(null, '', window.location.href);
        window.onpopstate = this._backConfirm;
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this._confirm);
        window.onpopstate = () => { }
      }
    
    _backConfirm = async () => {
        let event = window.confirm('Cannot go back to submission page. ');
        if(event){
            window.history.pushState(null, '', window.location.href);
        }
    }
    
    _confirm = (e) => {
        var confirmationMessage = '\o/';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }

    render() {
        const { amount } = this.state;
        return (
            <div className="DepositCheckTransaction">
                <UserNavigationBar active={2} />
                <div className="external-transaction-headerDivTransaction">
                    <div
                        className="TransactionAlert"
                        class={localStorage.getItem('alert_type')}
                        role="alert"
                        id="external-transaction-ty"
                    >
                        <p>{localStorage.getItem('status_response')}</p>
                    </div>
                </div>
                <div className="transfer-external-transactionInfo">
                    <h3>From: {this.state.from_acct}</h3>
                    <h3>To: {this.state.to_acct}</h3>
                    <h3>Routing number: {this.state.routing_num}</h3>
                    <h3>Amount: {this.state.amount}</h3>
                    <h3>Memo: {this.state.memo}</h3>
                </div>
                <div className="transfer-external-transactionbuttons">
                    <Link to="/userdashboard">
                        <button
                            type="button"
                            class="btn btn-primary"
                            id="external-transaction-backto-dash"
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
