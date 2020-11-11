import React, { useState } from 'react';
import './EditProfile.css';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import Logo from '../Logo';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axiosInstance from '../../axios';
import Loader from 'react-loader-spinner';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            city: '',
            region: '',
            zipcode: '',
            phone_number: '',
            birthday: '',

            other_accts: [],

            err_firstname: '',
            err_lastname: '',
            err_email: '',
            err_address: '',
            err_city: '',
            err_region: '',
            err_zipcode: '',
            err_phone_number: '',
            err_birthday: '',
            loading: true,
        };

        this.firstname = this.firstname.bind(this);
        this.lastname = this.lastname.bind(this);
        this.email = this.email.bind(this);
        this.address = this.address.bind(this);
        this.city = this.city.bind(this);
        this.region = this.region.bind(this);
        this.zipcode = this.zipcode.bind(this);
        this.phone_number = this.phone_number.bind(this);
        this.birthday = this.birthday.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getClient() {
        const response = await axiosInstance.get();
    }

    async getClient() {
        try {
            const res2 = await axiosInstance.get(`/clients`);
            const loaded_client = res2.data;

            this.setState({ firstname: loaded_client.first_name });
            this.setState({ lastname: loaded_client.last_name });
            this.setState({ email: loaded_client.email });
            this.setState({ address: loaded_client.address });
            this.setState({ city: loaded_client.city });
            this.setState({ region: loaded_client.state });
            this.setState({ zipcode: loaded_client.zipcode });
            this.setState({ phone_number: loaded_client.phone_num });
            this.setState({ birthday: loaded_client.birthday });

            return res2;
        } catch (error) {
            throw error;
        }
    }

    // To check other user's emails (can't be the same!!!)
    async getOtherAccounts() {
        try {
            const res2 = await axiosInstance.get(`/all_clients/`);

            const loaded_accounts = res2.data;

            this.setState({ other_accts: loaded_accounts });

            return res2;
        } catch (error) {
            throw error;
        }
    }
    async componentDidMount() {
        const client = await this.getClient();
        const other_accounts = await this.getOtherAccounts();
        this.setState({ loading: false });

        for (var i = 0; i < this.state.other_accts.length; i++) {
            console.log(this.state.other_accts[i]);
        }
    }

    firstname(e) {
        this.setState({ firstname: e.target.value, err_firstname: '' });
    }

    lastname(e) {
        this.setState({ lastname: e.target.value, err_lastname: '' });
    }

    email(e) {
        this.setState({ email: e.target.value, err_email: '' });
    }

    address(e) {
        this.setState({ address: e.target.value, err_address: '' });
    }

    city(e) {
        this.setState({ city: e.target.value, err_city: '' });
    }

    region(e) {
        this.setState({ region: e.target.value, err_region: '' });
    }

    zipcode(e) {
        this.setState({ zipcode: e.target.value, err_zipcode: '' });
    }

    phone_number(e) {
        this.setState({ phone_number: e.target.value, err_phone_number: '' });
    }

    birthday(e) {
        this.setState({ birthday: e.target.value, err_birthday: '' });
    }

    calculate_age = (date) => {
        var today = new Date();
        var birth_date = this.state.birthday;
        var age_now = today.getFullYear() - birth_date.getFullYear();
        var m = today.getMonth() - birth_date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth_date.getDate())) {
            age_now--;
        }
        console.log('my age', age_now);
        return age_now;
    };

    handleSubmit(e) {
        if (this.state.firstname.match(/^[a-zA-Z ]{2,40}$/gm) == null) {
            e.preventDefault();
            this.setState({
                err_firstname: 'Last name must be b/w 2-40 chars, Letters Only',
            });
        }

        if (this.state.lastname.match(/^[a-zA-Z ]{2,40}$/gm) == null) {
            e.preventDefault();
            this.setState({
                err_lastname: 'Last name must be b/w 2-40 chars, Letters Only',
            });
        }

        if (
            this.state.email.match(
                /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/gm
            ) == null
        ) {
            e.preventDefault();
            this.setState({
                err_email: 'Not valid email',
            });
        } else if (
            this.state.other_accts.some(
                (acct) => acct.email === this.state.email
            )
        ) {
            e.preventDefault();
            this.setState({
                err_email: 'Email already in bank',
            });
        }

        if (this.state.address.match(/^[.#0-9a-zA-Z ]{2,50}$/gm) == null) {
            e.preventDefault();
            this.setState({
                err_address: 'Not Valid address (No Special Chars exc . and #)',
            });
        }

        if (
            this.state.city.match(
                /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']{2,40}$/gm
            ) == null
        ) {
            e.preventDefault();
            this.setState({
                err_city:
                    'Not valid city: Only language based letters. Length b/w 2 and 40 chars allowed.',
            });
        }

        if (this.state.region.match(/^[A-Z]{2,2}$/gm) == null) {
            e.preventDefault();
            this.setState({
                err_region:
                    'Not valid state: Only capital letters and length of 2',
            });
        }

        if (this.state.zipcode.match(/^[0-9]{5,5}$/gm) == null) {
            e.preventDefault();
            this.setState({
                err_zipcode: 'Not valid zipcode: Only numbers and length of 5',
            });
        }

        if (
            this.state.phone_number.match(
                /^[0-9]{3,3}-[0-9]{3,3}-[0-9]{4,4}$/gm
            ) == null
        ) {
            e.preventDefault();
            this.setState({
                err_phone_number:
                    'Not valid phone number: Format should be XXX-XXX-XXXX and numbers only',
            });
        }

        const getAge = Math.floor(
            (new Date() - new Date(this.state.birthday).getTime()) / 3.15576e10
        );

        if (getAge <= 17) {
            this.setState({
                err_birthday: 'You must be at least 18 years of old to join.',
            });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.history);
        this.props.history.push('/userdashboard/');
        if (
            this.state.err_address == '' &&
            this.state.err_birthday == '' &&
            this.state.err_city == '' &&
            this.state.err_email == '' &&
            this.state.err_firstname == '' &&
            this.state.err_lastname == '' &&
            this.state.err_phone_number == '' &&
            this.state.err_region == '' &&
            this.state.err_zipcode == ''
        ) {
            const id = localStorage.getItem('user_id');
            console.log(this.state.firstname);
            console.log(this.state.lastname);
            console.log(this.state.email);
            console.log(this.state.address);
            console.log(this.state.city);
            console.log(this.state.region);
            console.log(this.state.zipcode);
            console.log(this.state.phone_number);
            console.log(this.state.birthday);
            const response = axiosInstance.post(`clients/${id}/edit_client/`, {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.email,
                address: this.state.address,
                city: this.state.city,
                state: this.state.region,
                zipcode: this.state.zipcode,
                phone_num: this.state.phone_number,
                birthday: this.state.birthday,
            });
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            );
        }

        console.log('Client: ' + this.state.email);
        console.log('Accounts: ' + this.state.other_accts);

        return (
            <div className="EditProfile">
                <UserNavigationBar active={4} />
                <div className="header-editprofile">Edit Profile</div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input
                        className="form-control"
                        name="firstname"
                        label="Firstname"
                        id="firstname"
                        placeholder="First Name"
                        value={this.state.firstname}
                        onChange={this.firstname}
                    />
                    <h6 className="error">{this.state.err_firstname}</h6>
                    <input
                        className="form-control"
                        name="lastname"
                        id="lastname"
                        label="Lastname"
                        placeholder="Last Name"
                        value={this.state.lastname}
                        onChange={this.lastname}
                    />
                    <h6 className="error">{this.state.err_lastname}</h6>
                    <input
                        className="form-control"
                        name="email"
                        id="email"
                        label="email"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.email}
                    />
                    <h6 className="error">{this.state.err_email}</h6>
                    <input
                        className="form-control"
                        type="address"
                        name="address"
                        id="address"
                        label="address"
                        placeholder="Address"
                        value={this.state.address}
                        onChange={this.address}
                    />
                    <h6 className="error">{this.state.err_address}</h6>
                    <input
                        className="form-control"
                        type="city"
                        name="city"
                        id="city"
                        label="city"
                        placeholder="City"
                        value={this.state.city}
                        onChange={this.city}
                    />
                    <h6 className="error">{this.state.err_city}</h6>
                    <input
                        className="form-control"
                        type="region"
                        name="region"
                        id="region"
                        label="region"
                        placeholder="Region"
                        value={this.state.region}
                        onChange={this.region}
                    />
                    <h6 className="error">{this.state.err_region}</h6>
                    <input
                        className="form-control"
                        type="zipcode"
                        name="zipcode"
                        id="zipcode"
                        label="zipcode"
                        placeholder="Zipcode"
                        value={this.state.zipcode}
                        onChange={this.zipcode}
                    />
                    <h6 className="error">{this.state.err_zipcode}</h6>
                    <input
                        className="form-control"
                        type="phone_number"
                        name="phone_number"
                        id="phone_number"
                        label="phone_number"
                        placeholder="Phone Number"
                        value={this.state.phone_number}
                        onChange={this.phone_number}
                    />
                    <h6 className="error">{this.state.err_phone_number}</h6>
                    <input
                        className="form-control"
                        type="date"
                        name="birthday"
                        id="birthday"
                        label="birthday"
                        placeholder="Birthday"
                        value={this.state.birthday}
                        onChange={this.birthday}
                    />
                    <h6 className="error">{this.state.err_birthday}</h6>
                    <button
                        className="editprofile-btn btn"
                        type="submit"
                        onSubmit={this.onSubmit}
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(EditProfile);
