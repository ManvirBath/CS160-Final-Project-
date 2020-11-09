import React from "react";
import "./Transfer.css";
import { Link } from "react-router-dom";
import UserNavigationBar from "../UserNavBar/UserNavBar";
import axiosInstance from "../../axios";
import Loader from "react-loader-spinner";

class TransferInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to_acct: "",
      from_acct: "",
      amount: "",
      memo: "n/a",
      errorToAcct: "",
      errorFromAcct: "",
      errorAmount: "",
      errorIsSameAcct: "",
      accts: [],
      // others_accts: [],
      axiosInstance: null,
      loading: true,
    };
    this.to_acct = this.to_acct.bind(this);
    this.from_acct = this.from_acct.bind(this);
    this.amount = this.amount.bind(this);
    this.memo = this.memo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getClientAccounts() {
    try {
      const res = await axiosInstance.get("/accounts/");
      const d = res.data;
      this.setState({ accts: d });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async componentDidMount() {
    const clients = await this.getClientAccounts();
    this.setState({ loading: false });
  }

  to_acct(e) {
    this.setState({ to_acct: e.target.value });
    this.setState({ errorToAcct: "" });
    this.setState({ errorIsSameAcct: "" });
  }
  from_acct(e) {
    this.setState({ from_acct: e.target.selectedOptions[0] });
    this.setState({ errorFromAcct: "" });
    this.setState({ errorIsSameAcct: "" });
  }
  amount(e) {
    this.setState({ amount: e.target.value });
    this.setState({ errorAmount: "" });
  }
  memo(e) {
    this.setState({ memo: e.target.value });
  }

  handleSubmit(e) {
    //validates from account
    if (this.state.from_acct === "") {
      e.preventDefault();
      this.setState({
        errorFromAcct: "Select an account to transfer from",
      });
    }
    //validates to account
    if (this.state.to_acct === "") {
      e.preventDefault();
      this.setState({
        errorToAcct: "Select an account to transfer from",
      });
    }

    //checks if from and to account are the same
    if (this.state.to_acct === this.state.from_acct.value) {
      e.preventDefault();
      this.setState({
        errorIsSameAcct: "Accounts cannot be the same!",
      });
    }

    //validates amount
    if (this.state.amount <= 0) {
      e.preventDefault();
      this.setState({ errorAmount: "Amount must be greater than 0" });
    }

    console.log(this.state.to_acct);
    console.log(this.state.from_acct.value);
    console.log(this.state.amount);
    console.log(this.state.memo);
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }

    let userAccts = this.state.accts.map((v) => (
      <option value={v.account_num}>
        {v.account_type} {v.account_num}: {v.balance}
      </option>
    ));

    return (
      <div className="TransferInternal">
        <UserNavigationBar active={2} />
        <div className="greeting-InternalTransfer">Internal Transfer</div>
        <div className="Transfer-InternalPage">
          <h6 className="error" id="same-error">
            {this.state.errorIsSameAcct}
          </h6>
          <div id="internal-transerfrom">Transfer From</div>
          <select
            className="accounts"
            id="accounts"
            class="btn btn-light dropdown-toggle"
            onChange={this.from_acct}
          >
            <option value="acctNumFrom" disabled selected>
              Transfer Money From
            </option>
            {userAccts}
          </select>
          <h6 className="error">{this.state.errorFromAcct}</h6>

          <div id="transfer-internal-transerto">Transfer To</div>
          <select
            className="accounts"
            id="accounts1"
            class="btn btn-light dropdown-toggle"
            onChange={this.to_acct}
          >
            <option value="acctNumTo" disabled selected>
              Transfer Money To
            </option>
            {userAccts}
          </select>
          <h6 className="error" id="transferto-error">
            {this.state.errorToAcct}
          </h6>

          <div className="transferinternal-inputDiv">
            <div id="internal-amount">Amount</div>
            <input
              type="text"
              className="amountInput"
              placeholder="$"
              id="internal-amount-div"
              onChange={this.amount}
              class="form-control"
            ></input>
            <h6 className="error">{this.state.errorAmount}</h6>

            <div id="transfer-internal-memo">Memo(optional)</div>
            <textarea
              type="text"
              className="memoInput"
              id="transfer-internal-memoInput"
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
                from_acct: this.state.from_acct.value,
                amount: this.state.amount,
                memo: this.state.memo,
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                id="btn-primary"
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
