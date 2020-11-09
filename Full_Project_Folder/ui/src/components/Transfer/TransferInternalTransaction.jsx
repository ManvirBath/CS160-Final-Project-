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
    };
  }

  componentDidMount() {
    console.log(this.props.location.from_acct);
    console.log(this.props.location.to_acct);
    console.log(this.props.location.amount);
    console.log(this.props.location.memo);

    axiosInstance
      .post(`accounts/${this.props.location.from_acct}/transfer_internal/`, {
        to_account_number: this.props.location.to_acct,
        amount: this.props.location.amount,
        location: "Online",
        memo: this.props.location.memo,
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
          <h4>From: {this.props.location.from_acct}</h4>
          <h4>To: {this.props.location.to_acct}</h4>
          <h4>Amount: {this.props.location.amount}</h4>
          <h4>Memo: {this.props.location.memo}</h4>
        </div>
        <div className="transfer-internal-transactionbuttons">
          <Link to="/userdashboard">
            <button
              type="button"
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
