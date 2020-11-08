import React from "react";
import "./DepositCheck.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import UserNavigationBar from "../UserNavBar/UserNavBar";

class DepositCheckTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axiosInstance.post(
      `accounts/${this.props.location.to_account_num}/deposit/`,
      {
        amount: this.props.location.amount,
        location: "Online",
        memo: this.props.location.memo,
      }
    );
    console.log(`helloaccounts/${this.props.location.to_account_num}/deposit/`);
  }
  render() {
    return (
      <div className="DepositCheckTransaction">
        <UserNavigationBar active={3} />
        <div
          className="TransactionAlert"
          class="alert alert-success"
          role="alert"
          id="depositchecktransaction-ty"
        >
          <p>
            Thank you for depositing your check! Please contact us if you have
            any questions or concerns.
          </p>
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
      </div>
    );
  }
}

export default DepositCheckTransaction;
