import React, { useState } from "react";
import "./ManagerDashboard.css";
import Logo from "../Logo";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../axios";
import ManagerNavigationBar from "../ManagerNavBar/ManagerNavBar";
import Loader from "react-loader-spinner";

class ManagerDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async getClients() {
    try {
      const res2 = await this.state.axiosInstance.get("/all_accounts");
      let users = res2.data;
      console.log(users);
      return res2;
    } catch (error) {
      throw error;
    }
  }
  async componentDidMount() {
    this.state.axiosInstance = axiosInstance;
    const clients = await this.getClients();
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className="managerdashboard">
        <ManagerNavigationBar />
        <div className="Statistics">
          <h5>
            <label for="client-stats">Clients</label>
          </h5>
          <h1>
            <span id="client-stats" class="badge badge-secondary">
              [insert # of clients]
            </span>
          </h1>
          <h5>
            <label for="account-stats">Accounts</label>
          </h5>
          <h1>
            <span id="account-stats" class="badge badge-secondary">
              [insert # of accounts]
            </span>
          </h1>
          <h5>
            <label for="transaction-stats">Transactions</label>
          </h5>
          <h1>
            <span id="transaction-stats" class="badge badge-secondary">
              [insert # of transactions]
            </span>
          </h1>
        </div>
      </div>
    );
  }
}
export default ManagerDashboard;
