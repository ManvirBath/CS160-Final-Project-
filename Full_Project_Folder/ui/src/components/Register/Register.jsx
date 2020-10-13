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
            password: '',
        };
        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.firstname = this.firstname.bind(this);
        this.lastname = this.lastname.bind(this);
    }

    email(e) {
        this.setState({ email: e.target.value });
    }
    password(e) {
        this.setState({ password: e.target.value });
    }
    firstname(e) {
        this.setState({ firstname: e.target.value });
    }
    lastname(e) {
        this.setState({ lastname: e.target.value });
    }

    render() {
        const { email, password } = this.state;
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
                        onChange={this.firstname}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        onChange={this.lastname}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email Address"
                        onChange={this.email}
                    />
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        onChange={this.password}
                    />
                    <button
                        className="btn"
                        onClick={() => {
                            this.props.Register({ email, password });
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
