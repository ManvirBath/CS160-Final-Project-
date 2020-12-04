import React, { useState } from 'react';
import './Contact.css';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import { Jumbotron, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Contact extends React.Component {
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
            <div className="contact">
                <div id="contactus-greeting">Contact Us</div>
                <Jumbotron className="contact-jumbotron">
                    <div className="contact-upper">
                        <div id="line1">
                            Have any questions or concerns? We would be happy to
                            help.{' '}
                        </div>{' '}
                        <div id="line2">
                            Feel free to contact us with any questions or
                            inquiries.
                        </div>
                        <div id="line3">24/7, 365 Customer Service.</div>
                    </div>
                    <span className="contact-office-location">
                        <div id="office-location-header">Office Location </div>
                        <div className="office-location">
                            123 Avenue X
                            <div id="office-location2">
                                San Jose, California{' '}
                            </div>
                            <div id="office-location3">95123 </div>
                            <div id="office-location4">USA</div>
                        </div>
                    </span>
                    <span className="contact-phone">
                        <div id="contact-number-header">
                            <i class="material-icons">phone</i>
                        </div>
                        <div id="contact-number">(408)123-4567 </div>
                    </span>
                    <span className="contact-email">
                        <div id="contact-email-header">
                            <i class="material-icons">mail</i>
                        </div>
                        <div id="contact-email">DeepLearningBank@email.com</div>
                    </span>
                    <span className="contact-routing-number">
                        <div id="contact-routing-number-header">
                            <div>Routing Number: 123456789</div>
                        </div>
                    </span>
                </Jumbotron>
                {button}
            </div>
        );
    }
}
export default Contact;
