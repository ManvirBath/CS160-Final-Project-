import React, { useState } from 'react';
import './Register.css';
import Logo from '../Logo';
import { useHistory } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom';
import axiosInstance from '../../axios';

export default function SignUp() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone_number: '',
        birthday: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post('register/', {
                first_name: formData.firstname,
                last_name: formData.lastname,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipcode: formData.zipcode,
                phone_num: formData.phone_number,
                birthday: formData.birthday,
            })
            .then((res) => {
                history.push('/login');
                console.log(res);
                console.log(res.data);
            });
    };

    // if (localStorage.getItem('user_id') == null) {
    //   return (
    //     <Redirect to='/' />
    //   )
    // }

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
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    name="lastname"
                    id="lastname"
                    label="Lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    name="email"
                    id="email"
                    label="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    label="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="address"
                    name="address"
                    id="address"
                    label="address"
                    placeholder="Address"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="city"
                    name="city"
                    id="city"
                    label="city"
                    placeholder="City"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="state"
                    name="state"
                    id="state"
                    label="state"
                    placeholder="State"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="zipcode"
                    name="zipcode"
                    id="zipcode"
                    label="zipcode"
                    placeholder="Zipcode"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="phone_number"
                    name="phone_number"
                    id="phone_number"
                    label="phone_number"
                    placeholder="Phone Number"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="date"
                    name="birthday"
                    id="birthday"
                    label="birthday"
                    placeholder="Birthday"
                    onChange={handleChange}
                />
                <button className="btn" type="submit" onClick={handleSubmit}>
                    Register
                </button>
            </div>
            <div className="footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
