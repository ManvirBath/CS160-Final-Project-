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
            accts: [
                {
                    account_num: 12345,
                    account_balance: 12345,
                    account_type: 'Checkings',
                },
                {
                    account_num: '00001',
                    account_balance: '00001',
                    account_type: 'Savings',
                },
                {
                    account_num: 11111,
                    account_balance: 11111,
                    account_type: 'Checkings',
                },
            ],
            name: 'Test',
        };
    }
    navigateToAccount(accountNumber) {
        window.history.pushState(
            { hello: 'world' },
            'title',
            `${accountNumber}`
        );
    }
    getAccounts() {
        return this.state.accts.map((v) => {
            const {
                account_balance: ab,
                account_num: an,
                account_type: at,
            } = v;
            return (
                <div
                    className="box flexbox"
                    onClick={() => {
                        this.navigateToAccount(an);
                    }}
                >
                    <div class="AccountInfo flexbox-column">
                        <div className="major">{at}</div>
                        <div className="minor">{an}</div>
                    </div>
                    <div className="AccountBalance lastItem">
                        <div className="major">${ab}</div>
                        <div className="minor">Available Balance</div>
                    </div>
                </div>
            );
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
    }
    render() {
        const acctTemplate = this.getAccounts();
        const { name } = this.state;
        return (
            <div className="userdashboard">
                <UserNavigationBar active={0} />
                <div className="container-userdash">
                    <div className="greeting-userdash">
                        Welcome to your dashboard, {name}!
                    </div>
                    <div className="flexbox-column">
                        <div>Personal Accounts</div>
                        <div className="accounts-container">{acctTemplate}</div>
                    </div>
                </div>
                <footer>
                    <div className="flexbox">
                        <a href="/contact">
                            <span>contact us</span>
                        </a>
                        <a href="/GMap">
                            <span>Find ATM</span>
                        </a>
                    </div>
                </footer>
            </div>
        );
    }
}
export default UserDashboard;
