import React from "react";
import "./DepositCheck.css";
import { Link } from "react-router-dom";
import UserNavigationBar from "../UserNavBar/UserNavBar";

class DepositCheckConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="DepositCheckConfirm">
        <UserNavigationBar active={3} />

        <div id="deposit-check-confirm">Confirm check deposit</div>
        <div id="deposit-check-confirmdetails">
          Please confirm your details before submitting.
        </div>
        <div className="depositcheck-confirm-details">
          <h4>Deposit to: {this.props.location.account}</h4>
          <h4>Amount: {this.props.location.amount}</h4>
          <h4>Memo: {this.props.location.memo}</h4>
          <h4>Check file: {this.props.location.check_image}</h4>
          <div className="buttons">
            <Link to="/depositcheck">
              <button type="button" class="btn btn-danger">
                Don't make deposit
              </button>
            </Link>
            <Link
              to={{
                pathname: "/depositchecktransaction",
                account: this.props.location.account,
                amount: this.props.location.amount,
                memo: this.props.location.memo,
                check_image: this.props.location.check_image,
                to_account_num: this.props.location.to_account_num,
              }}
            >
              <button type="button" class="btn btn-primary">
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default DepositCheckConfirm;
