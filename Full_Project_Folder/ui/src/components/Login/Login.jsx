import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

export default function SignIn() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`api/token/`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                history.push({
                    pathname: '/userdashboard',
                    email: formData.email,
                });
                //console.log(res);
                //console.log(res.data);
            });
    };
    return (
        <div className="Login">
            <div className="form">
                <Logo color="rgb(255,255,255)" text="Deep Learning Bank"></Logo>
                <input
                    className="form-control"
                    name="email"
                    id="email"
                    label="Email Address"
                    placeholder="Email Address"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="btn" type="submit" onClick={handleSubmit}>
                    Login
                </button>
            </div>
            <div className="footer">
                Don't have an account? <Link to="/register">Register</Link>
            </div>
            <div className="footer">
                Forgot your password?{' '}
                <Link to="/recovery">Recover Password</Link>
            </div>
        </div>
    );
}
