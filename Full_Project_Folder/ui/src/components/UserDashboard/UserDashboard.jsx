import React, { useState } from 'react';
import './UserDashboard.css';
import Logo from '../Logo';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import {
    Button,
    Navbar,
    FormControl,
    Nav,
    Form,
    Dropdown,
} from 'react-bootstrap';

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
                <div className={v.account_type}>
                    {v.account_type}: {v.balance}
                    <div>{v.account_num} Balance</div>
                </div>
            </div>
        ));
        const { name, saving, checking } = this.state;
        return (
            <div className="userdashboard">
                <div id="header-title">Deep Learning Bank</div>
                <div id="header-logoff">
                    <Button variant="light">Logout</Button>{' '}
                </div>
                <div className="navlist">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="/userdashboard"
                            >
                                Account
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/billpay">
                                Pay Bill
                            </a>
                        </li>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                Transfer
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/transferinternal">
                                    Between my accounts
                                </Dropdown.Item>
                                <Dropdown.Item href="/transferexternal">
                                    Between external accounts
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <li className="nav-item">
                            <a className="nav-link" href="/depositcheck">
                                Deposit
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/withdraw">
                                Withdraw
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="container">
                    <div id="greeting">
                        Welcome to your dashboard, {this.state.firstName}!
                    </div>
                    <div id="dashboard-logo">
                        <Logo color="rgb(0,0,0)"></Logo>
                    </div>
                    <div id="greeting2">Personal Accounts</div>
                    <div>{acctTemplate}</div>
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
