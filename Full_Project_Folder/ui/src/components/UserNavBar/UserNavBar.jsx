import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import axiosInstance from '../../axios';
import { Link, useHistory } from 'react-router-dom';
import './UserNavBar.css';
import Logo from '../Logo';
const dropDown = [
    {
        name: 'Account',
        href: '',
        children: [
            {
                name: 'View my Account',
                href: '/userdashboard',
            },
            {
                name: 'Open an Account',
                href: '/openaccount',
            },
            {
                name: 'Close an Account',
                href: '/closeaccount',
            },
        ],
    },
    {
        name: 'Pay Bill',
        href: '',
        children: [
            {
                name: 'Create Bill Payment',
                href: '/billpay',
            },
            {
                name: 'Show Bill Payments',
                href: '/billpayshow',
            },
        ],
    },
    {
        name: 'Transfer',
        href: '/billpay',
        children: [
            {
                name: 'Between my accounts',
                href: '/transferinternal',
            },
            {
                name: 'Between external accounts',
                href: '/transferexternal',
            },
        ],
    },
    {
        name: 'Deposit/Withdraw',
        href: '',
        children: [
            {
                name: 'Deposit Money',
                href: '/depositcheck',
            },
            {
                name: 'Withdraw Money',
                href: '/withdraw',
            },
        ],
    },
    {
        name: 'Services',
        href: '',
        children: [
            {
                name: 'Edit Profile',
                href: '/editprofile',
            },
            {
                name: 'ATM Finder',
                href: '/GMap',
            },
            {
                name: 'Contact Us',
                href: '/Contact',
            },
        ],
    },
];
class UserNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: 0 };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('usertoken');
        localStorage.removeItem('user_id');
        localStorage.removeItem('email');
        axiosInstance.defaults.headers['Authorization'] = null;
        console.log(localStorage);
    }
    getListItem(data, pos) {
        const { name, href, children } = data;
        const active = pos === this.props.active;

        return (
            <li key={href} className={`nav-item ${active ? 'selected' : ''}`}>
                {children ? (
                    this.getSubCat(name, children)
                ) : (
                    <a className="nav-link" href={href}>
                        {name}
                    </a>
                )}
            </li>
        );
    }
    getSubCat(name, children) {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="" className="dropdown-basic">
                    {name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {children.map((child) => {
                        return (
                            <Dropdown.Item
                                onClick={() => {
                                    console.log('SELECTED!!!');
                                    localStorage.removeItem('bill_id');
                                    localStorage.removeItem('to_acct');
                                    localStorage.removeItem('from_acct');
                                    localStorage.removeItem('routing_num');
                                    localStorage.removeItem('amount');
                                    localStorage.removeItem('frequency');
                                    localStorage.removeItem('pay_date');
                                    localStorage.removeItem('memo');

                                    localStorage.removeItem('to_account');
                                    localStorage.removeItem('to_account_num');
                                    localStorage.removeItem('check_image');
                                    localStorage.removeItem('account_num');
                                    localStorage.removeItem('account_type');
                                    localStorage.removeItem('balance');
                                }}
                                key={child.href}
                                href={child.href}
                            >
                                {child.name}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
    getNavList() {
        const dropDownComponent = dropDown.map((item, index) => {
            return this.getListItem(item, index);
        });
        return (
            <div className="navlist maxWidth">
                <ul className="nav nav-pills nav-fill">{dropDownComponent}</ul>
            </div>
        );
    }
    render() {
        const navList = this.getNavList();
        return (
            <div className="usernavbar flexbox">
                <div className="flexbox-center maxWidth">
                    <Logo
                        color="rgb(255,255,255)"
                        text="Deep Learning Bank"
                    ></Logo>
                    <div className="header-logoff lastItem">
                        <Link to="/main">
                            <Button
                                className="usernavbar-button"
                                variant="light"
                                id="logout-usernavbar"
                                onClick={this.handleLogout}
                            >
                                Logout
                            </Button>
                        </Link>
                    </div>
                </div>
                {navList}
            </div>
        );
    }
}
export default UserNavigationBar;
