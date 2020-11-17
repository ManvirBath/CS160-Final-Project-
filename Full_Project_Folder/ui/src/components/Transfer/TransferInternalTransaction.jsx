import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class TransferInternalTransaction extends React.Component {
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
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
            memo: this.props.location.memo || localStorage.getItem('memo'),
        };
    }

    componentDidMount() {
        console.log(this.state.from_acct);
        console.log(this.state.to_acct);
        console.log(this.state.amount);
        console.log(this.state.memo);
        // window.addEventListener('popstate', (event) => {
        //   if (event.state) {
        //     alert("Please press 'Go to Dashboard' button")
        //   }
        //  }, false);

        //  window.addEventListener("beforeunload", this._confirm);
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
                <UserNavigationBar active={2} />
                <div className="internal-transaction-headerDivTransaction">
                    <div
                        className="TransactionAlert"
                        class={localStorage.getItem('alert_type')}
                        role="alert"
                        id="depositchecktransaction-ty"
                    >
                        <p>{localStorage.getItem('status_response')}</p>
                    </div>
                </div>
                <div className="transfer-internal-transactionInfo">
                    <h4>From: {this.state.from_acct}</h4>
                    <h4>To: {this.state.to_acct}</h4>
                    <h4>Amount: {this.state.amount}</h4>
                    <h4>Memo: {this.state.memo}</h4>
                </div>
                <div className="transfer-internal-transactionbuttons">
                    <Link to="/userdashboard">
                        <button
                            type="submit"
                            class="btn btn-primary"
                            id="internal-transaction-backto-dash"
                        >
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default TransferInternalTransaction;
