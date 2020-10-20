import React, { useState } from 'react';
import './Register.css';
import Logo from '../Logo';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';

export default function SignUp() {
    const history = useHistory();
    const initialFormData = Object.freeze({
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
            .post('test/register/', {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                history.push('/login');
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
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="Email Address"
                    onChange={handleChange}
                />
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
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
