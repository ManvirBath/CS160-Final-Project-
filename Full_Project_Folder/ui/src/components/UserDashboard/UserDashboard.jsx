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
        };
    }
    firstName(e) {}
    checkingAccount(e) {}
    savingAccount(e) {}
    checkingBalance(e) {}
    savingBalance(e) {}

    async getAccounts(){
        try {
            let res = await axiosInstance.get('/accounts');
            console.log(res.data);
            const d = res.data;
            this.setState({ accts: d });
            return d;
        }catch(error){
            console.log("Header AFTER: " + axiosInstance.defaults.headers['Authorization'])
            console.log("Hello error: ", JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }

    async getClients(){
        try {
            let res2 = await axiosInstance.get('/clients');
            let userEmail = this.props.location.email;
            let users = res2.data.results;
            for (var index = 0; index < users.length; index++) {
                if (users[index].email == userEmail) {
                    this.setState({ firstName: users[index].first_name });
                }
            }
            return res2;
        } catch(error){
            console.log("Header: " + axiosInstance.defaults.headers['Authorization'])
            console.log("Hello Client error: ", JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }
    componentDidMount() {
        this.getAccounts()
        this.getClients()
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
                <UserNavigationBar />
                <div className="container-userdash">
                    <div id="greeting-userdash">
                        Welcome to your dashboard, {this.state.firstName}!
                    </div>
                    <div id="greeting-userdash2">Personal Accounts</div>
                    <div className="acct-temp">
                        <Link to="/Account" id="acct-temp-link">
                            {acctTemplate}
                        </Link>
                    </div>
                </div>
                <div className="navlist2">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a className="nav-link" href="/GMap">
                                ATM Locator
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default UserDashboard;
