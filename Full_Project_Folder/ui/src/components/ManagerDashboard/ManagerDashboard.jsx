import React, { useState } from 'react';
import './ManagerDashboard.css';
import Logo from '../Logo';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import ManagerNavigationBar from '../ManagerNavBar/ManagerNavBar';
import Loader from 'react-loader-spinner';

class ManagerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async getClients() {
        try {
            const res2 = await this.state.axiosInstance.get('/all_accounts');
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
                <div className="statistics">
                    <label for="client-stats">Clients</label>

                    <span id="client-stats" class="badge badge-secondary">
                        [insert # of clients]
                    </span>

                    <label for="account-stats">Accounts</label>

                    <span id="account-stats" class="badge badge-secondary">
                        [insert # of accounts]
                    </span>

                    <label for="transaction-stats">Transactions</label>

                    <span id="transaction-stats" class="badge badge-secondary">
                        [insert # of transactions]
                    </span>
                </div>
                <div className="search-area">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">
                                Query
                            </span>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter keyword here"
                            aria-label="query-search"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                </div>
                <div className="query-results"></div>
            </div>
        );
    }
}
export default ManagerDashboard;
