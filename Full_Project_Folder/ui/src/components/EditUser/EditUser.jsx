import React, { useState } from 'react';
import './EditUser.css';
import Logo from '../Logo';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: window.location.pathname.split( '/' )[2] || -1
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            phone_number: '',
            birthday: '',

            other_accts: [],

            err_firstname: '',
            err_lastname: '',
            err_password: '',
            err_email: '',
            err_address: '',
            err_city: '',
            err_state: '',
            err_zipcode: '',
            err_phone_number: '',
            err_birthday: '',
        };
    }

    async getClient() {
        const response = await axiosInstance.get()
    }

    async getClient(){
        try {
            const res2 = await axiosInstance.get(`/clients`);
            const loaded_client = res2.data;

            this.setState({ firstname: loaded_client.first_name });
            this.setState({ lastname: loaded_client.lastname});
            this.setState({ email: loaded_client.email });
            this.setState({ address: loaded_client.address});
            this.setState({ city: loaded_client.city});
            this.setState({ state: loaded_client.state });
            this.setState({ zipcode: loaded_client.zipcode });
            this.setState({ phone_number: loaded_client.phone_number });
            this.setState({ birthday: loaded_client.birthday });

            return res2;
        } catch (error) {

            throw error;
        }
    }

    // To check other user's emails (can't be the same!!!)
    async getOtherAccounts(){
        try {
            const res2 = await axiosInstance.get(`/all_acounts`);
            const loaded_accounts = res2.data;

            this.setState({ other_accts: loaded_accounts });
            
            return res2;
        } catch (error) {
            throw error;
        }
    }
    async componentDidMount() {
        const client = await this.getClient()
        const other_accounts = await this.getOtherAccounts()

    }

    firstname(e) {
        this.setState({ firstname: e.target.value });
        this.setState({ err_firstname: '' });
    }

    lastname(e) {
        this.setState({ lastname: e.target.value });
        this.setState({ err_lastname: '' });
    }

    password(e) {
        this.setState({ password: e.target.value });
        this.setState({ err_password: '' });
    }

    email(e) {
        this.setState({ email: e.target.value });
        this.setState({ err_email: '' });
    }

    address(e) {
        this.setState({ address: e.target.value });
        this.setState({ err_address: '' });
    }

    city(e) {
        this.setState({ city: e.target.value });
        this.setState({ err_city: '' });
    }

    state(e) {
        this.setState({ state: e.target.value });
        this.setState({ err_state: '' });
    }

    zipcode(e) {
        this.setState({ zipcode: e.target.value });
        this.setState({ err_zipcode: '' });
    }

    phone_number(e) {
        this.setState({ phone_number: e.target.value });
        this.setState({ err_phone_number: '' });
    }

    birthday(e) {
        this.setState({ birthday: e.target.value });
        this.setState({ err_birthday: '' });
    }

    handleSubmit(e) {
        //validates to account
        if (this.state.to_acct === '') {
            e.preventDefault();
            this.setState({
                errorToAcct: 'Account number cannot be empty',
            });
        } else if (
            (this.state.to_acct.length > 9) |
            (this.state.to_acct.length < 9)
        ) {
            e.preventDefault();
            this.setState({
                errorToAcct: 'Account number must be 9 digits',
            });
        }
        if (this.state.to_acct.match(/^[0-9]*$/gm) == null) {
            e.preventDefault();
            this.setState({
                errorToAcct:
                    'Account number must contain only values 0-9 (inclusive)',
            });
        }

        //validates routing number
        if (this.state.routing_num === '') {
            e.preventDefault();
            this.setState({
                errorRouting: 'Routing number cannot be empty',
            });
        } else if (
            (this.state.routing_num.length > 9) |
            (this.state.routing_num.length < 9)
        ) {
            e.preventDefault();
            this.setState({
                errorRouting: 'Routing number must be 9 digits',
            });
        }
        if (this.state.routing_num.match(/^[0-9]*$/gm) == null) {
            e.preventDefault();
            this.setState({
                errorRouting:
                    'Routing number must contain only values 0-9 (inclusive)',
            });
        }
        //validates from account
        if (this.state.from_acct === '') {
            e.preventDefault();
            this.setState({
                errorFromAcct: 'Select an account to transfer from',
            });
        }
        //validates amount
        if (this.state.amount <= 0) {
            e.preventDefault();
            this.setState({ errorAmount: 'Amount must be greater than 0.00!' });
        }
        //validate paydate (make sure date selected isn't in past)
        var today = new Date();
        var parts = this.state.pay_date.split('-');
        var selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);
        if (selectedDate < today) {
            e.preventDefault();
            this.setState({
                errorDate: 'Scheduled date cannot be in the past.',
            });
        }
        console.log(this.state.pay_date);
        if (this.state.pay_date == '') {
            e.preventDefault();
            this.setState({ errorDate: 'Select a date to pay bill' });
        }
    }

    render() {
        return (
            <div className="Register">
                        <div className="form">
                            <Logo color="rgb(255,255,255)" text="Deep Learning Bank"></Logo>
                            <input
                                className="form-control"
                                name="firstname"
                                label="Firstname"
                                id="firstname"
                                placeholder="First Name"
                                onChange={this.firstname}
                            />
                            <input
                                className="form-control"
                                name="lastname"
                                id="lastname"
                                label="Lastname"
                                placeholder="Last Name"
                                onChange={this.lastname}
                            />
                            <input
                                className="form-control"
                                name="email"
                                id="email"
                                label="email"
                                placeholder="Email Address"
                                onChange={this.email}
                            />
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                id="password"
                                label="password"
                                placeholder="Password"
                                onChange={this.password}
                            />
                            <input
                                className="form-control"
                                type="address"
                                name="address"
                                id="address"
                                label="address"
                                placeholder="Address"
                                onChange={this.address}
                            />
                            <input
                                className="form-control"
                                type="city"
                                name="city"
                                id="city"
                                label="city"
                                placeholder="City"
                                onChange={this.city}
                            />
                            <input
                                className="form-control"
                                type="state"
                                name="state"
                                id="state"
                                label="state"
                                placeholder="State"
                                onChange={this.state}
                            />
                            <input
                                className="form-control"
                                type="zipcode"
                                name="zipcode"
                                id="zipcode"
                                label="zipcode"
                                placeholder="Zipcode"
                                onChange={this.zipcode}
                            />
                            <input
                                className="form-control"
                                type="phone_number"
                                name="phone_number"
                                id="phone_number"
                                label="phone_number"
                                placeholder="Phone Number"
                                onChange={this.phone_number}
                            />
                            <input
                                className="form-control"
                                type="date"
                                name="birthday"
                                id="birthday"
                                label="birthday"
                                placeholder="Birthday"
                                onChange={this.birthday}
                            />
                            <button className="btn" type="submit" onClick={this.handleSubmit}>
                                Edit Client
                            </button>
                        </div>
                    </div>
        )
    }
}
