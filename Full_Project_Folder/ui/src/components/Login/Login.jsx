import React from 'react';
import './Login.css';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            dark: false,
        };
    }
    handlePassword(e) {
        this.setState({ password: e });
    }
    handleEmail(e) {
        this.setState({ email: e });
    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="Login">
                <div className="form">
                    <Logo
                        color="rgb(255,255,255)"
                        text="Deep Learning Bank"
                    ></Logo>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email Address"
                        onChange={this.handleEmail.bind(this)}
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
                            this.props.Login({ email, password });
                        }}
                    >
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
                <div className="footer1">
                    <Link to="/GMap">ATM Locator</Link>
                </div>
            </div>
        );
    }
}
export default Login;
