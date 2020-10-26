import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UserNavBar.css';

class UserNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="usernavbar">
                <div id="header-title">Deep Learning Bank</div>
                <div id="header-logoff">
                    <Button variant="light">Logout</Button>{' '}
                </div>
                <div className="navlist">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a className="nav-link" href="/userdashboard">
                                Account
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
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
            </div>
        );
    }
}

export default UserNavigationBar;
