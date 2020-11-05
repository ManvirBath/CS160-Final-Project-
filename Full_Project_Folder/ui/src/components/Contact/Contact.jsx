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
                <UserNavigationBar active={4} />
                <Jumbotron fluid id="jumbotron">
                    <Container id="contact-container">
                        <h1>Contact Us</h1>
                        <div id="line1">
                            Have questions? Need to make changes to your profile
                            or account information?
                        </div>{' '}
                        <div id="line2">
                            If you need any assistance at all, feel free to
                            contact us.
                        </div>
                        <div id="line3">24/7, 365 Customer Service.</div>
                        <div id="office-location-header">Office Location: </div>
                        <div className="office-location">
                            123 Avenue X
                            <div id="office-location2">
                                Gotham City, New Jersey{' '}
                            </div>
                            <div id="office-location3">07863 </div>
                            <div id="office-location4">USA </div>
                        </div>
                        <div id="contact-number-header">Phone:</div>
                        <div id="contact-number">(732) 583-3950 </div>
                        <div id="contact-email-header">Email:</div>
                        <div id="contact-email">DeepLearningBank@email.com</div>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}
export default Contact;
