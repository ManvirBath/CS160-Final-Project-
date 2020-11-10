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
        return (
            <div className="contact">
                <div id="contactus-greeting">Contact Us</div>
                <Jumbotron className="contact-jumbotron">
                    <div className="contact-upper">
                        <div id="line1">
                            Have questions? Need to make changes to your profile
                            or account information?
                        </div>{' '}
                        <div id="line2">
                            If you need any assistance at all, feel free to
                            contact us.
                        </div>
                        <div id="line3">24/7, 365 Customer Service.</div>
                    </div>
                    <span className="contact-office-location">
                        <div id="office-location-header">Office Location: </div>
                        <div className="office-location">
                            123 Avenue X
                            <div id="office-location2">
                                Gotham City, New Jersey{' '}
                            </div>
                            <div id="office-location3">07863 </div>
                            <div id="office-location4">USA </div>
                        </div>
                    </span>
                    <span className="contact-phone">
                        <div id="contact-number-header">Phone:</div>
                        <div id="contact-number">(732) 583-3950 </div>
                    </span>
                    <span className="contact-email">
                        <div id="contact-email-header">Email:</div>
                        <div id="contact-email">DeepLearningBank@email.com</div>
                    </span>
                </Jumbotron>
                <div className="footer">
                    <Link to="/main">Back to home page</Link>
                </div>
                <div className="footer">
                    <Link to="/userdashboard">Back to dashboard</Link>
                </div>
            </div>
        );
    }
}
export default Contact;
