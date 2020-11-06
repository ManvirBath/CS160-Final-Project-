import React, { useState } from 'react';
import './NotFound.css';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import { Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
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
                            Navigate back to home page
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotFound;
