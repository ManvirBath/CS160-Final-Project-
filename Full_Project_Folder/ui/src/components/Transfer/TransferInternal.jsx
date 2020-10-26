import React from "react";
import "./Transfer.css";
import { Link } from "react-router-dom";
import UserNavigationBar from "../UserNavBar/UserNavBar";

class TransferInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to_acct: "",
      from_acct: "",
      amount: "",
      memo: "",
    };
    this.to_acct = this.to_acct.bind(this);
    this.from_acct = this.from_acct.bind(this);
    this.amount = this.amount.bind(this);
    this.memo = this.memo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputValidation() {
    let amnt = this.state.amount;
    let isValidForm = true;
    if (amnt === "100") {
      isValidForm = false;
      console.log("falsefalse");
    }
    console.log("outoutout");
    return isValidForm;
  }

  to_acct(e) {
    this.setState({ to_acct: e.target.selectedOptions[0].text });
    //alert(this.state.to_acct);
  }
  from_acct(e) {
    this.setState({ from_acct: e.target.selectedOptions[0].text });
    //alert(e.target.selectedOptions[0].text);
  }
  amount(e) {
    this.setState({ amount: e.target.value });
  }
  memo(e) {
    this.setState({ memo: e.target.value });
  }

  handleSubmit(e) {
    //console.log("handle submit 1");
    //e.preventDefault();
    //console.log("handle submit 2");
    if (this.inputValidation()) {
      return true;
      //console.log("form submitted");
    } else {
      e.preventDefault();
      //console.log("form has errors");
    }
    //alert("hello from handle submit");
  }

  render() {
    return (
      <div className="TransferInternal">
        <UserNavigationBar />
        <h1 className="PageHeader">Transfer Between My Accounts</h1>
        <div className="transfer">
          <h2>From</h2>
          <select
            className="accounts"
            id="accounts"
            class="btn btn-light dropdown-toggle"
            onChange={this.from_acct}
          >
            <option value="acctNumFrom" disabled selected>
              Transfer Money From
            </option>
            <option value="Account1">Savings Account 123</option>
            <option value="Account2">Savings Account 345</option>
            <option value="Account3">Checking Account 678</option>
          </select>

          <h2>To</h2>
          <select
            className="accounts"
            id="accounts"
            class="btn btn-light dropdown-toggle"
            onChange={this.to_acct}
          >
            <option value="acctNumTo" disabled selected>
              Transfer Money To
            </option>
            <option value="Account1">Savings Account 123</option>
            <option value="Account2">Savings Account 345</option>
            <option value="Account3">Checking Account 678</option>
          </select>

          <div className="inputDiv">
            <h2>Amount</h2>
            <input
              type="text"
              className="amountInput"
              placeholder="$"
              onChange={this.amount}
              class="form-control"
            ></input>

            <h2>Memo(optional)</h2>
            <textarea
              type="text"
              className="memoInput"
              placeholder="Memo"
              class="form-control"
              onChange={this.memo}
            />
          </div>
          <div className="nextBtn">
            <Link
              to={{
                pathname: "/transferinternalconfirm",
                to_acct: this.state.to_acct,
                from_acct: this.state.from_acct,
                amount: this.state.amount,
                memo: this.state.memo,
              }}
            >
              <button
                type="button"
                class="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TransferInternal;
