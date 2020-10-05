import React from 'react';
import './Register.css';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            dark: false,
        };
    }
    handlePassword(e) {}
    handleUsername(e) {}

    render() {
        const { username, password } = this.state;
        return (
            <div className="Register">
                <div className="form">
                    <Logo
                        color="rgb(255,255,255)"
                        text="Deep Learning Bank"
                    ></Logo>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                        onChange={this.handleUsername.bind(this)}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        onChange={this.handleUsername.bind(this)}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email Address"
                        onChange={this.handleUsername.bind(this)}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        onChange={this.handleUsername.bind(this)}
                    />
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        onChange={this.handlePassword.bind(this)}
                    />
                    <button
                        className="btn"
                        onClick={() => {
                            this.props.Register({ username, password });
                        }}
                    >
                        Register
                    </button>
                </div>
                <div className="footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        );
    }
}
export default Register;
