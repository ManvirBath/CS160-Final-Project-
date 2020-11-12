import React from "react";
import "./Transfer.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import UserNavigationBar from "../UserNavBar/UserNavBar";

class TransferInternalTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status_response:
        "Thank you for your transfer request! Please contact us if you have any questions or concerns.",
      alert_type: "alert alert-success",
      to_acct: this.props.location.to_acct || localStorage.getItem('to_acct'),
      from_acct: this.props.location.from_acct || localStorage.getItem('from_acct'),
      amount: this.props.location.amount || localStorage.getItem('amount'),
      memo: this.props.location.memo || localStorage.getItem('memo'),
    };
  }

  componentDidMount() {
    console.log(this.state.from_acct);
    console.log(this.state.to_acct);
    console.log(this.state.amount);
    console.log(this.state.memo);
  }

  async check(e) {
    const from_cur_acc = await localStorage.getItem('from_acct');
    
    const response = await axiosInstance
    .post(`accounts/${from_cur_acc}/transfer_internal/`, {
      to_account_number: localStorage.getItem('to_acct'),
      amount: localStorage.getItem('amount'),
      location: "Online",
      memo: localStorage.getItem('memo'),
    })
    .catch((error) => {
      console.log(error.response.status);
      this.setState({ alert_type: "alert alert-danger" });
      this.setState({
        status_response:
          "ERROR: This was not a valid transaction. Please try again.",
      });
    });
  }
  
  render() {
    return (
      <div className="DepositCheckTransaction">
        <UserNavigationBar active={2} />
        <div className="internal-transaction-headerDivTransaction">
          <div
            className="TransactionAlert"
            class={this.state.alert_type}
            role="alert"
            id="depositchecktransaction-ty"
          >
            <p>{this.state.status_response}</p>
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
            <button type="submit" class="btn btn-primary" id="internal-transaction-backto-dash" onClick={this.check}>
              Back to Dashboard
            </button>
        </Link>
        </div>
      </div>
    );
  }
}

export default TransferInternalTransaction;
