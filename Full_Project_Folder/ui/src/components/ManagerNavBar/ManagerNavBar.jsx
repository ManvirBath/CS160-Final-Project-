import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import axiosInstance from '../../axios';
import { Link, useHistory } from 'react-router-dom';
import './ManagerNavBar.css';
import Logo from '../Logo';

class ManagerNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    render() {
        return (
            <div className="managernavbar flexbox">
                <div className="flexbox-center maxWidth">
                    <Logo
                        color="rgb(255,255,255)"
                        text="Deep Learning Bank"
                    ></Logo>
                    <div className="header-logoff lastItem">
                        <Link to="/login">
                            <Button
                                variant="light"
                                id="logout-managernavbar"
                                onClick={this.handleLogout}
                            >
                                Logout
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default ManagerNavigationBar;
