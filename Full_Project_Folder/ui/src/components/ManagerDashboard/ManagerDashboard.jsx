import React, { useState } from 'react';
import './ManagerDashboard.css';
import axiosInstance from '../../axios';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import ManagerNavigationBar from '../ManagerNavBar/ManagerNavBar';
import Loader from 'react-loader-spinner';

class ManagerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_clients: [],
            all_info: [],
            selected_client: '',
            selected_client_accts: [],
            selected_acct: '',
            selected_acct_transactions: [],
            num_clients: 0,
            num_accounts: 0,
            num_transactions: 0,
            loading: true,
            selected_client_name: '',
            selected_client_addr: '',
            selected_client_dob: '',
            selected_client_email: '',
            selected_client_phone: '',
        };
        this.selected_client = this.selected_client.bind(this);
        this.selected_acct = this.selected_acct.bind(this);
    }
    selected_client(e) {
        this.setState({ selected_client: e.target.value });
        this.setState({ selected_acct_transactions: [] });
    }
    selected_acct(e) {
        this.setState({ selected_acct: e.target.value });
    }
    async getClientsAndAccts() {
        try {
            const res1 = await this.state.axiosInstance.get(
                '/client_account_statistics/'
            );
            this.setState({ all_info: res1.data });
            res1.data.forEach((element) =>
                this.state.all_clients.push(element.email)
            );
        } catch (error) {
            throw error;
        }
    }

    async getBankStats() {
        try {
            const res2 = await this.state.axiosInstance.get(
                '/bank_statistics/'
            );
            //console.log(res2);
            this.setState({ num_accounts: res2.data.num_accounts });
            this.setState({ num_clients: res2.data.num_clients });
            this.setState({ num_transactions: res2.data.num_transactions });
            console.log(this.state.num_accounts);
        } catch (error) {
            throw error;
        }
    }

    async componentDidMount() {
        this.state.axiosInstance = axiosInstance;
        await this.getClientsAndAccts();
        await this.getBankStats();
        this.setState({ loading: false });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected_client !== this.state.selected_client) {
            let all_info = this.state.all_info;
            for (var index = 0; index < all_info.length; index++) {
                if (all_info[index].email === this.state.selected_client) {
                    console.log(all_info[index]);
                    //console.log(all_info[index].accounts);
                    this.setState({
                        selected_client_name: all_info[index].name,
                    });
                    this.setState({
                        selected_client_addr: all_info[index].address,
                    });
                    this.setState({
                        selected_client_dob: all_info[index].birthday,
                    });
                    this.setState({
                        selected_client_email: all_info[index].email,
                    });
                    this.setState({
                        selected_client_phone: all_info[index].phone_number,
                    });
                    this.setState({
                        selected_client_accts: all_info[index].accounts.map(
                            (x) => x
                        ),
                    });
                }
            }
        }
        if (prevState.selected_acct !== this.state.selected_acct) {
            let acct_info = this.state.selected_client_accts;
            for (var index = 0; index < acct_info.length; index++) {
                if (acct_info[index].account_id === this.state.selected_acct) {
                    console.log(acct_info[index].transactions);
                    this.setState({
                        selected_acct_transactions: acct_info[
                            index
                        ].transactions.map((x) => x),
                    });
                }
            }
        }
    }
    render() {
        if (localStorage.getItem('email') != 'dlb.admin@dlb.com') {
            return <Redirect to="/userdashboard" />;
        }

        let all_client_email = this.state.all_clients.map((v) => (
            <option value={v}>{v}</option>
        ));
        let client_accts = this.state.selected_client_accts.map((v) => (
            <option value={v.account_id}>
                {v.account_type} {v.account_id}
            </option>
        ));

        let acctTransactions = this.state.selected_acct_transactions.map(
            (v, index) => (
                <tr>
                    <th>{index + 1}</th>
                    <th>{v.transaction_date}</th>
                    <th>{v.transaction_amount}</th>
                    <th>{v.transaction_type}</th>
                </tr>
            )
        );

        if (this.state.loading) {
            return (
                <div>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            );
        }
        return (
            <div className="managerdashboard">
                <ManagerNavigationBar />
                <div className="statistics">
                    <label for="client-stats">Clients</label>
                    <span id="client-stats" class="badge badge-secondary">
                        {this.state.num_clients}
                    </span>
                    <label for="account-stats" id="accounts-label">
                        Accounts
                    </label>
                    <span id="account-stats" class="badge badge-secondary">
                        {this.state.num_accounts}
                    </span>
                    <label for="transaction-stats" id="transactions-label">
                        Transactions
                    </label>
                    <span id="transaction-stats" class="badge badge-secondary">
                        {this.state.num_transactions}
                    </span>
                </div>

                <div id="selected-client-info">
                    <h1>{this.state.selected_client_name}</h1>
                    <h3>Email: {this.state.selected_client_email}</h3>
                    <h3>Phone: {this.state.selected_client_phone}</h3>
                    <h4>Date of Birth: {this.state.selected_client_dob}</h4>
                    <h4>Address: {this.state.selected_client_addr}</h4>
                </div>

                <div className="search-area">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="clients">
                            Clients
                        </label>
                    </div>
                    <select
                        class="custom-select"
                        id="clients"
                        onChange={this.selected_client}
                    >
                        <option value="defaultVal" disabled selected>
                            Select Client
                        </option>
                        {all_client_email}
                    </select>

                    <div class="input-group-prepend">
                        <label class="input-group-text" for="accounts">
                            Accounts
                        </label>
                    </div>
                    <select
                        class="custom-select"
                        id="accounts"
                        onChange={this.selected_acct}
                    >
                        <option value="defaultVal" disabled selected>
                            Select Account
                        </option>
                        {client_accts}
                    </select>
                </div>
                <div className="query-results">
                    <h3>Transactions</h3>
                    <div className="account-table">
                        <table id="account-table">
                            <tr>
                                <th>Transaction Number</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Type</th>
                            </tr>
                            {acctTransactions}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default ManagerDashboard;
