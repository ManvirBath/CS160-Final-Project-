import React from "react";
import "./BillPay.css";
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
      to_acct: this.props.location.to_acct || localStorage.getItem('to_acct'),
      from_acct: this.props.location.from_acct || localStorage.getItem('from_acct'),
      routing_num: this.props.location.routing_num || localStorage.getItem('routing_num'),
      amount: this.props.location.amount || localStorage.getItem('amount'),
      pay_date: this.props.location.pay_date || localStorage.getItem('pay_date'),
      frequency: this.props.location.frequency || localStorage.getItem('frequency'),
    };

    this.check = this.check.bind(this)
  }

  componentDidMount() {
    const id = localStorage.getItem("user_id");
    console.log(typeof this.state.from_acct);
    console.log(typeof this.state.routing_num);
    console.log(typeof this.state.to_acct);
    console.log(typeof this.state.amount);
    console.log(typeof this.state.pay_date);
  }

  check(e) {
    const id = localStorage.getItem('user_id')
    axiosInstance
      .post(`clients/${id}/create_bill_payment/`, {
        from_account_num: this.state.from_acct,
        routing_num: this.state.routing_num,
        to_account_num: this.state.to_acct,
        amount: this.state.amount,
        date: this.state.pay_date,
      })
      .catch((error) => {
        console.log(error.response.status);
        this.setState({ alert_type: "alert alert-danger" });
        this.setState({
          status_response:
            "ERROR: This was not a valid payment. Please try again.",
        });
      });
  }
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
          <h4>From: {this.state.from_acct}</h4>
          <h4>To: {this.state.to_acct}</h4>
          <h4>Routing number: {this.state.routing_num}</h4>
          <h4>Amount: {this.state.amount}</h4>
          <h4>Bill payment date: {this.state.pay_date}</h4>
          <h4>Frequency: One Time</h4>
        </div>
        <div className="billpay-transaction-buttons">
          <Link to="/billpay">
            <button type="submit" class="btn btn-success" onClick={this.check}>
              Pay another bill
            </button>
          </Link>
          <Link to="/userdashboard">
            <button type="submit" class="btn btn-primary" onClick={this.check}>
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BillPayTransaction;
