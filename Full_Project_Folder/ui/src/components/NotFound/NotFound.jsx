import React, { useState } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let button;
        if (localStorage.getItem('email') == null) {
            button = (
                <div className="footer">
                    <Link to="/main">Home</Link>
                </div>
            );
        } else {
            button = (
                <div className="footer">
                    <Link to="/userdashboard">Dashboard</Link>
                </div>
            );
        }
        return (
            <div className="NotFound">
                <div className="Container-NotFound">
                    <div id="NotFound-Greeting">404</div>
                    <div id="NotFound-Greeting2">Page Not Found</div>
                    <div id="NotFound-Navigate-back">
                        <a
                            className="button-notfound"
                            id="notfound-navigateback-button"
                            href="/login"
                        >
                            {button}{' '}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotFound;
