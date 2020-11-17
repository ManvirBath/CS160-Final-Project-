import React from "react";
import "./CloseAccount.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom';
import UserNavigationBar from "../UserNavBar/UserNavBar";
import axiosInstance from "../../axios";

class CloseAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closeAcct: "",
      toAcct: "",
      amount: "",
      errorCloseAcct: "",
      errorToAcct: "",
      errorIsSameAcct: "",
      accts: [],
    };
    this.closeAcct = this.closeAcct.bind(this);
    this.toAcct = this.toAcct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axiosInstance.get("/accounts/").then((res) => {
      const d = res.data;
      this.setState({ accts: d });
    });
  }

  closeAcct(e) {
    //console.log(parseFloat(e.target.value.split("|")[1]));
    this.setState({ closeAcct: e.target.value.split("|")[0] });
    this.setState({ amount: parseFloat(e.target.value.split("|")[1]) });
    this.setState({ errorCloseAcct: "" });
    console.log(this.state.closeAcct);
    console.log(this.state.amount);
  }

  toAcct(e) {
    this.setState({ toAcct: e.target.value.split("|")[0] });
    this.setState({ errorToAcct: "" });
    this.setState({ errorIsSameAcct: "" });
  }

  async handleSubmit(e) {
    //validates close account
    if (this.state.closeAcct === "") {
      e.preventDefault();
      this.setState({
        errorCloseAcct: "Select an account to close",
      });
    }

    //validates to account
    if (this.state.toAcct === "") {
      e.preventDefault();
      this.setState({
        errorToAcct: "Select an account to transfer funds to",
      });
    }

    //validates if accounts are the same
    if (this.state.toAcct === this.state.closeAcct) {
      e.preventDefault();
      this.setState({
        errorIsSameAcct: "Accounts cannot be the same!",
      });
    }
    if (
      (this.state.errorCloseAcct === "") &
      (this.state.errorIsSameAcct === "") &
      (this.state.errorToAcct === "")
    ) {
      const res1 = await axiosInstance.post(`accounts/${this.state.toAcct}/deposit/`, {
        amount: this.state.amount,
        location: "Online",
        memo: `CLOSED ACCOUNT #${this.state.toAcct}`
      });

      const res2 = await axiosInstance.post(`accounts/${this.state.closeAcct}/close_account/`, {
        location: "Online",
        memo: "ACCOUNT CLOSED: " + this.state.closeAcct,
      });
      console.log(this.state.closeAcct);
    }
  }

  render() {
    if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
      return (
          <Redirect to="/managerdashboard" />
      )
  }

    let userAccts = this.state.accts.map((v) => (
      <option value={v.account_num + "|" + v.balance}>
        {v.account_type} {v.account_num}: {v.balance}
      </option>
    ));
    console.log(this.state.toAcct)
    return (
      <div className="closeAccount">
        <UserNavigationBar active={0} />
        <div id="closeacct-greeting">Close Account</div>
        <div className="closeacct">
          <h6 className="error">{this.state.errorIsSameAcct}</h6>
          <div id="closeacct-option">Which account do you want to close?</div>
          <div className="closeaccount-types">
            <select
              className="accounts"
              id="accounts"
              class="btn btn-light dropdown-toggle"
              onChange={this.closeAcct}
            >
              <option value="default" disabled selected>
                Account to close
              </option>
              {userAccts}
            </select>
            <h6 className="error">{this.state.errorCloseAcct}</h6>
            <div id="closeacct-option">
              Select an account to transfer funds to:
            </div>
            <select
              className="accounts"
              id="accounts"
              class="btn btn-light dropdown-toggle"
              onChange={this.toAcct}
            >
              <option value="default" disabled selected>
                Account to transfer funds
              </option>
              {userAccts}
            </select>
            <h6 className="error">{this.state.errorToAcct}</h6>

            <div className="closeaccount-nextBtn">
              <Link
                to={{
                  pathname: "/userdashboard",
                }}
              >
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Close Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CloseAccount;
