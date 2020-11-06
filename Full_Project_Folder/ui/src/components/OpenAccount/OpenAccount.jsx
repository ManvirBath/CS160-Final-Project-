import React from "react";
import "./OpenAccount.css";
import { Link, useHistory } from "react-router-dom";
import Logo from "../Logo";
import UserNavigationBar from "../UserNavBar/UserNavBar";
import axiosInstance from "../../axios";

class OpenAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acctType: "",
      errorAcctOption: "",
    };
    this.acctType = this.acctType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  acctType(e) {
    this.setState({ acctType: e.target.value });
    this.setState({ errorAcctOption: "" });
  }

  async handleSubmit(e) {
    try {
        if (this.state.acctType === "") {
        e.preventDefault();
        this.setState({ errorAcctOption: "Select an option" });
        const option = await this.state.errorAcctOption
        return option

        } else {
            const id = localStorage.getItem('user_id')
            const response = await axiosInstance.post(`clients/${id}/create_account/`, {
                account_type: this.state.acctType
            });
            return response
        }
    } catch (error) {
        console.log(error);
    }
  }

  render() {
    return (
      <div className="OpenAccount">
        <div id="active-open-account">
          <UserNavigationBar />
        </div>

        <h1 className="PageHeader"></h1>
        <div id="open-account-header">Open Account</div>
        <div className="openacct">
          <h2 id="openacctoption">
            Which type of account would you like to open?
          </h2>
        </div>
        <div className="types">
          <select
            className="accttype"
            id="accounts"
            class="btn btn-light dropdown-toggle"
            onChange={this.acctType}
          >
            <option value="default" disabled selected>
              Account Type
            </option>
            <option value="checking">Checking Account</option>
            <option value="savings">Savings Account</option>
          </select>
        </div>
        <h6 className="error">{this.state.errorAcctOption}</h6>
        <div className="nextBtn">
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
              Open Account
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default OpenAccount;