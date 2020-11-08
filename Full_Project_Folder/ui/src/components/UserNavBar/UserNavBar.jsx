import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        name: 'Deposit',
        href: '/depositcheck',
    },
    {
        name: 'Services',
        href: '',
        children: [
            {
                name: 'ATM Locator',
                href: '/GMap',
            },
            {
                name: 'Contact Us',
                href: '/contact',
            },
        ],
    },
];
class UserNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: 0 };
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
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    {name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {children.map((child) => {
                        return (
                            <Dropdown.Item key={child.href} href={child.href}>
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
                        <Button variant="light" id="logout-usernavbar">
                            Logout
                        </Button>
                    </div>
                </div>
                {navList}
            </div>
        );
    }
}
export default UserNavigationBar;
