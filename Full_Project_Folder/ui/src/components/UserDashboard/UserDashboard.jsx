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

    componentDidMount() {
        axiosInstance.get('/accounts/').then((res) => {
            console.log(res.data);
            const d = res.data;
            this.setState({ accts: d });
            //const d = res.data.response.items;
            //console.log(d.account_num);
        });

        axiosInstance.get('/clients/').then((res2) => {
            let userEmail = this.props.location.email;
            let users = res2.data.results;
            for (var index = 0; index < users.length; index++) {
                if (users[index].email == userEmail) {
                    this.setState({ firstName: users[index].first_name });
                }
            }
        });
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
                    <div className="acct-temp">{acctTemplate}</div>
                </div>
                <div className="navlist2">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a className="nav-link" href="/openAccount">
                                Open Account
                            </a>
                        </li>
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
