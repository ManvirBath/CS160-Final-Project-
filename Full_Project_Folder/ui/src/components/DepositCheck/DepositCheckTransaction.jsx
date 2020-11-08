import React from "react";
import "./DepositCheck.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import UserNavigationBar from "../UserNavBar/UserNavBar";

class DepositCheckTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status_response:
        "Thank you for your deposit! Please contact us if you have any questions or concerns.",
      alert_type: "alert alert-success",
    };
  }

  componentDidMount() {
    axiosInstance
      .post(`accounts/${this.props.location.to_account_num}/deposit/`, {
        amount: this.props.location.amount,
        location: "Online",
        memo: this.props.location.memo,
        check_path: this.props.location.check_image,
      })
      .catch((error) => {
        console.log(error.response.status);
        this.setState({ alert_type: "alert alert-danger" });
        this.setState({
          status_response:
            "ERROR: This was not a valid deposit. Please try again.",
        });
      });
    console.log(`helloaccounts/${this.props.location.to_account_num}/deposit/`);
  }
  render() {
    return (
      <div className="DepositCheckTransaction">
        <UserNavigationBar active={3} />
        <div
          className="TransactionAlert"
          class={this.state.alert_type}
          role="alert"
          id="depositchecktransaction-ty"
        >
          <p>{this.state.status_response}</p>
        </div>
        <div className="depositchecktransaction-info">
          <h4>Deposit to: {this.props.location.account}</h4>
          <h4>Amount: {this.props.location.amount}</h4>
          <h4>Memo: {this.props.location.memo}</h4>
          <h4>Check file: {this.props.location.check_image}</h4>
          <div className="deposit-check-transactions-buttons">
            <Link to="/depositcheck">
              <button type="button" class="btn btn-success" id="btn-depcheck">
                Make Another Deposit
              </button>
            </Link>
            <Link to="/userdashboard">
              <button type="button" class="btn btn-primary" id="btn-depcheck2">
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
