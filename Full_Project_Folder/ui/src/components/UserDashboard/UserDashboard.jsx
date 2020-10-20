import React from 'react';
import './UserDashboard.css';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { Button, Navbar, FormControl, Nav, Form } from 'react-bootstrap';

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            checkingAccount: '',
            savingAccount: '',
            checkingBalance: '',
            savingBalance: '',
        };
    }
    firstName(e) {}
    checkingAccount(e) {}
    savingAccount(e) {}
    checkingBalance(e) {}
    savingBalance(e) {}

    render() {
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
                            <a className="nav-link" href="#">
                                Pay Bill
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Transfer
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Withdraw/Deposit
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Open Account
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="container">
                    <div id="greeting">Hello, customer!</div>
                    <div id="dashboard-logo">
                        <Logo color="rgb(0,0,0)"></Logo>
                    </div>
                    <div id="greeting2">Personal Accounts</div>
                    <div className="checking">Checking: $$$$$</div>
                    <div className="checking-bal">*******1234 Balance</div>
                    <div className="saving">Saving: $$$$$</div>
                    <div className="saving-bal">*******9876 Balance</div>
                    <div className="saving2">Saving: $$$$$</div>
                    <div className="saving2-bal">*******5432 Balance</div>
                </div>

                <div id="services">Services</div>
                <div className="container2">
                    <div className="services-list">
                        <ul className="nav flex-column">
                            <li className="nav-item" id="settings">
                                <a className="nav-link" href="#">
                                    Settings
                                </a>
                            </li>
                            <li className="nav-item" id="atm-finder">
                                <a className="nav-link" href="/GMap">
                                    Find ATM
                                </a>
                            </li>
                            <li className="nav-item" id="contact">
                                <a className="nav-link" href="#">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserDashboard;
