import React, { useState } from 'react';
import './Register.css';
import Logo from '../Logo';
import { useHistory, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            address: '',
            city: '',
            region: '',
            zipcode: '',
            phone_number: '',
            birthday: '',

            err_firstname: '',
            err_lastname: '',
            err_email: '',
            err_password: '',
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
        this.password = this.password.bind(this);
        this.address = this.address.bind(this);
        this.city = this.city.bind(this);
        this.region = this.region.bind(this);
        this.zipcode = this.zipcode.bind(this);
        this.phone_number = this.phone_number.bind(this);
        this.birthday = this.birthday.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    password(e) {
        this.setState({ password: e.target.value, err_password: '' });
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
                err_firstname:
                    'Please omit any special characters and keep it between 2 and 40 characters long',
            });
        }

        if (this.state.lastname.match(/^[a-zA-Z ]{2,40}$/gm) == null) {
            e.preventDefault();
            this.setState({
                err_lastname:
                    'Please omit any special characters and keep it between 2 and 40 characters long',
            });
        }

        if (
            this.state.email.match(
                /^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$/gm
            ) == null
        ) {
            e.preventDefault();
            this.setState({
                err_email:
                    'Entered an email address that is not valid. Please try again',
            });
        }

        if (this.state.password.length < 10) {
            e.preventDefault();
            this.setState({
                err_password:
                    'The password must be at least 10 characters long. Please try again',
            });
        }
        if (this.state.address.match(/^[.#0-9a-zA-Z ]{2,50}$/gm) == null) {
            e.preventDefault();
            this.setState({
                err_address:
                    'Please omit special characters and ensure address is between 2-50 characters',
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
                    'Please omit special characters and ensure the name is between 2-40 characters',
            });
        }

        if (this.state.region == '') {
            e.preventDefault();
            this.setState({
                err_region:
                    'Must select a state or territory that is in the United States',
            });
        }

        if (this.state.zipcode.length != 5) {
            e.preventDefault();
            this.setState({
                err_zipcode:
                    'Not a valid U.S. zipcode. Please make sure it is 5 digits long',
            });
        }

        if (
            this.state.phone_number.toString().length != 10 &&
            this.state.phone_number.toString().length != 11
        ) {
            e.preventDefault();
            this.setState({
                err_phone_number:
                    'The provided number is not valid. The country code is optional',
            });
        }

        const getAge = Math.floor(
            (new Date() - new Date(this.state.birthday).getTime()) / 3.15576e10
        );

        if (this.state.birthday == '' || getAge <= 17) {
            this.setState({
                err_birthday:
                    'You must be of the age 18 years or older in order to join',
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
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
            console.log(this.state.firstname);
            console.log(this.state.lastname);
            console.log(this.state.email);
            console.log(this.state.password);
            console.log(this.state.address);
            console.log(this.state.city);
            console.log(this.state.region);
            console.log(this.state.zipcode);
            console.log(this.state.phone_number);
            console.log(this.state.birthday);

            axiosInstance
                .post('register/', {
                    first_name: this.state.firstname,
                    last_name: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.region,
                    zipcode: this.state.zipcode,
                    phone_num: this.state.phone_number,
                    birthday: this.state.birthday,
                })
                .then((response) => {
                    console.log(this.props.history);
                    this.props.history.push('/login/');
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.data.email != null)
                            this.setState({
                                err_email:
                                    'This email is already in use. Please try again with a different email address.',
                            });
                        else
                            alert(
                                'A problem processing your input has occured. Please check the format of your input and try again. If this error persists, please contact support.'
                            );
                    } else if (err.request) {
                        alert(
                            'Your request could not reach the server. Please check your internet connection ant try again. If this error persists, please contact support.'
                        );
                    } else {
                        alert(
                            'An unknown error has occured. Please try again. If this error persists, please contact support.'
                        );
                    }
                });
        }
    }

    render() {
        return (
            <div className="Register">
                <div className="contain">
                    <Logo
                        color="rgb(255,255,255)"
                        text="Deep Learning Bank"
                    ></Logo>
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
                        <div className="error">{this.state.err_firstname}</div>
                        <input
                            className="form-control"
                            name="lastname"
                            id="lastname"
                            label="Lastname"
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.lastname}
                        />
                        <div className="error">{this.state.err_lastname}</div>
                        <input
                            className="form-control"
                            name="email"
                            id="email"
                            label="email"
                            placeholder="Email Address"
                            value={this.state.email}
                            onChange={this.email}
                        />
                        <div className="error">{this.state.err_email}</div>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            id="password"
                            label="password"
                            placeholder="Password"
                            onChange={this.password}
                        />
                        <div className="error">{this.state.err_password}</div>
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
                        <div className="error">{this.state.err_address}</div>
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
                        <div className="error">{this.state.err_city}</div>
                        <select
                            className="form-control"
                            type="region"
                            name="region"
                            id="region"
                            label="region"
                            placeholder="Region"
                            value={this.state.region}
                            onChange={this.region}
                        >
                            <option value="" hidden={true}>
                                U.S. State/Territory
                            </option>
                            <optgroup label="States">
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Deleware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LS">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </optgroup>
                            <optgroup label="U.S. Territories">
                                <option value="DC">Washington D.C.</option>
                                <option value="AS">American Samoa</option>
                                <option value="GU">Guam</option>
                                <option value="MP">
                                    Northern Mariana Islands
                                </option>
                                <option value="PR">Puerto Rico</option>
                                <option value="VI">U.S. Virgin Islands</option>
                            </optgroup>
                        </select>
                        <div className="error">{this.state.err_region}</div>
                        <input
                            className="form-control"
                            name="zipcode"
                            id="zipcode"
                            label="zipcode"
                            placeholder="Zipcode"
                            type="number"
                            value={this.state.zipcode}
                            onChange={this.zipcode}
                        />
                        <div className="error">{this.state.err_zipcode}</div>
                        <input
                            className="form-control"
                            name="phone_number"
                            id="phone_number"
                            label="phone_number"
                            placeholder="Phone Number (numbers only)"
                            type="number"
                            value={this.state.phone_number}
                            onChange={this.phone_number}
                        />
                        <div className="error">
                            {this.state.err_phone_number}
                        </div>
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
                        <div className="error">{this.state.err_birthday}</div>
                        <button
                            className="register-btn btn"
                            type="submit"
                            onSubmit={this.onSubmit}
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
                <div className="footer">
                    <Link to="/main">Back to home page</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
