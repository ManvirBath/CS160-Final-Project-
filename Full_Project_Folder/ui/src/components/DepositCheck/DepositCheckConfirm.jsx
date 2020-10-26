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
        <UserNavigationBar />
        <div className="headerDiv">
          <h1 className="PageHeader" class="jumbotron">
            Confirm check deposit
          </h1>
          <h6 className="PageHeader2" class="lead">
            Please confirm your details before submitting.
          </h6>
        </div>
        <div className="details">
          <h4>Deposit to: {this.props.location.account}</h4>
          <h4>Amount: {this.props.location.amount}</h4>
          <h4>Memo: {this.props.location.memo}</h4>
          <h4>Check file: {this.props.location.check_image}</h4>
          <img src={this.props.location.check_image}></img>
        </div>
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
              file: this.props.location.file,
              check_image: this.props.location.check_image,
            }}
          >
            <button type="button" class="btn btn-primary">
              Submit
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default DepositCheckConfirm;
