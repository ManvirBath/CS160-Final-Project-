import React from 'react';
import './Login.css';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            dark: false,
        };
    }
    handlePassword(e) {
        this.setState({ password: e });
    }
    handleUsername(e) {
        this.setState({ username: e });
    }
    goDark() {
        this.setState({ dark: true });
    }
    render() {
        const { username, password } = this.state;
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
                            this.props.Login({ username, password });
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
            </div>
        );
    }
}
export default Login;
