import React from "react";
import "./Transfer.css";
import { Link } from "react-router-dom";
import UserNavigationBar from "../UserNavBar/UserNavBar";

class TransferExternalConfirm extends React.Component {
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
            Confirm transfer
          </h1>
          <h6 className="PageHeader2" class="lead">
            Please confirm your details before submitting.
          </h6>
        </div>
        <div className="details">
          <h4>
            Transfer From:
            {this.props.location.from_acct}
          </h4>
          <h4>Transfer To: {this.props.location.to_acct}</h4>
          <h4>Routing number: {this.props.location.routing_num}</h4>
          <h4>Amount: {this.props.location.amount}</h4>
          <h4>Memo: {this.props.location.memo}</h4>
        </div>
        <div className="buttons">
          <Link to="/transferexternal">
            <button type="button" class="btn btn-danger">
              Don't make transfer
            </button>
          </Link>
          <Link
            to={{
              pathname: "/transferexternaltransaction",
              from_acct: this.props.location.from_acct,
              to_acct: this.props.location.to_acct,
              amount: this.props.location.amount,
              memo: this.props.location.memo,
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

export default TransferExternalConfirm;
