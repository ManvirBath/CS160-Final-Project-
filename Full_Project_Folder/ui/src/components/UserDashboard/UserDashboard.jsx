import React from 'react';
import './UserDashboard.css';
import Logo from '../Logo';
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
                <UserNavigationBar />
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
                                <a className="nav-link" href="#">
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
