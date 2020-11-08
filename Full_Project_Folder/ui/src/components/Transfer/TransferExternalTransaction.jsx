import React from "react";
import "./Transfer.css";
import { Link } from "react-router-dom";
import UserNavigationBar from "../UserNavBar/UserNavBar";
import axiosInstance from "../../axios";

class TransferExternalTransaction extends React.Component {
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
    console.log(typeof parseInt(this.props.location.routing_num));

    if (parseInt(this.props.location.routing_num) == parseInt("123456789")) {
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
    } else {
      axiosInstance
        .post(`accounts/${this.props.location.from_acct}/transfer_external/`, {
          amount: this.props.location.amount,
          location: "Online",
          routing_num: this.props.location.routing_num,
          to_account_num: this.props.location.to_acct,
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
  }

  render() {
    const { amount } = this.state;
    return (
      <div className="DepositCheckTransaction">
        <UserNavigationBar active={2} />
        <div className="external-transaction-headerDivTransaction">
          <div
            className="TransactionAlert"
            class={this.state.alert_type}
            role="alert"
            id="external-transaction-ty"
          >
            <p>{this.state.status_response}</p>
          </div>
        </div>
        <div className="transfer-external-transactionInfo">
          <h3>From: {this.props.location.from_acct}</h3>
          <h3>To: {this.props.location.to_acct}</h3>
          <h3>Routing number: {this.props.location.routing_num}</h3>
          <h3>Amount: {this.props.location.amount}</h3>
          <h3>Memo: {this.props.location.memo}</h3>
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
