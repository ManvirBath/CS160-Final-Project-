import React, { useState } from 'react';
import './UserDashboard.css';
import Logo from '../Logo';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            checkingAccount: '',
            savingAccount: '',
            checkingBalance: '',
            savingBalance: '',
            accts: [],
            axiosInstance: null,
            email: '',
        };
    }
    async getAccounts() {
        try {
            const res = await this.state.axiosInstance.get('/accounts');
            console.log(res.data);
            const d = res.data;
            this.setState({ accts: d });
            console.log(d);
            return res;
        } catch (error) {
            // console.log("Header AFTER: " + this.state.axiosInstance.defaults.headers['Authorization'])
            console.log('Hello error: ', JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }

    async getClients() {
        try {
            const res2 = await this.state.axiosInstance.get('/clients');
            this.state.email = localStorage.getItem('email');
            let users = res2.data;
            console.log(res2.data);
            for (var index = 0; index < users.length; index++) {
                if (users[index].email == this.state.email) {
                    this.setState({ firstName: users[index].first_name });
                }
            }
            // console.log("Header AFTER: " + this.state.axiosInstance.defaults.headers['Authorization'])

            return res2;
        } catch (error) {
            // console.log("Header: " + axiosInstance.defaults.headers['Authorization'])
            // console.log("Hello Client error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }
    componentDidMount() {
        this.state.axiosInstance = axiosInstance;
        console.log(
            'Header AFTER: ' +
                this.state.axiosInstance.defaults.headers['Authorization']
        );
        this.getAccounts();
        this.getClients();
    }
    render() {
        let acctTemplate = this.state.accts.map((v) => (
            <div key={v.account_num} className="acctBox">
                <div className={v.account_type} id="acct-info">
                    {v.account_type} ${v.balance}
                    <div id="bal">{v.account_num} Balance</div>
                </div>
            </div>
        ));
        const { name, saving, checking } = this.state;
        return (
            <div className="userdashboard">
                <UserNavigationBar active={0} />
                <div className="container-userdash">
                    <div id="greeting-userdash">
                        Welcome to your dashboard, {this.state.firstName}!
                    </div>
                    <div id="greeting-userdash2">Personal Accounts</div>
                    <div className="acct-temp">{acctTemplate}</div>
                </div>
            </div>
        );
    }
}
export default UserDashboard;
