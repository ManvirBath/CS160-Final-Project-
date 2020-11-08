import React from "react";
import "./BillPayEdit.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";
import UserNavigationBar from "../UserNavBar/UserNavBar";

class BillPayTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status_response:
        "Thank you for your bill payment! Please contact us if you have any questions or concerns.",
      alert_type: "alert alert-success",
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split("/")[2];
    console.log(typeof this.props.location.from_acct);
    console.log(typeof this.props.location.routing_num);
    console.log(typeof this.props.location.to_acct);
    console.log(typeof this.props.location.amount);
    console.log(typeof this.props.location.pay_date);

    axiosInstance
      .post(`bill_payments/${id}/edit_bill_payment/`, {
        from_account_num: this.props.location.from_acct,
        routing_num: this.props.location.routing_num,
        to_account_num: this.props.location.to_acct,
        amount: this.props.location.amount,
        date: this.props.location.pay_date,
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

  check() {}
  render() {
    return (
      <div className="BillPayTransaction">
        <UserNavigationBar active={1} />
        <div className="billpay-headerDivTransaction">
          <div
            className="TransactionAlert"
            class={this.state.alert_type}
            role="alert"
            id="billpaytransaction-ty"
          >
            <p>{this.state.status_response}</p>
          </div>
        </div>
        <div className="billpay-transactionInfo">
          <h4>From: {this.props.location.from_acct}</h4>
          <h4>To: {this.props.location.to_acct}</h4>
          <h4>Routing number: {this.props.location.routing_num}</h4>
          <h4>Amount: {this.props.location.amount}</h4>
          <h4>Bill payment date: {this.props.location.pay_date}</h4>
          <h4>Frequency: One Time</h4>
        </div>
        <div className="billpay-transaction-buttons">
          <Link to="/billpayshow">
            <button type="button" class="btn btn-success">
              Show Bills
            </button>
          </Link>
          <Link to="/userdashboard">
            <button type="button" class="btn btn-primary" onClick={this.check}>
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BillPayTransaction;
