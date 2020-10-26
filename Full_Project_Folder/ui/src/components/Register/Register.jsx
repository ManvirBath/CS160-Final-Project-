import React, { useState } from 'react';
import './Register.css';
import Logo from '../Logo';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';

export default function SignUp() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
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
            })
            .then((res) => {
                history.push('/registertwo');
                console.log(res);
                console.log(res.data);
            });
    };
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
                <button className="btn" type="submit" onClick={handleSubmit}>
                    Next
                </button>
            </div>
            <div className="footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
