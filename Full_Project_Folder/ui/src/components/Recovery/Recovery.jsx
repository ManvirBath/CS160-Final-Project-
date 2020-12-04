import React from 'react';
import './Recovery.css';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

class Recovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    render() {
        const { email } = this.state;
        return (
            <div className="Recovery">
                <div className="recovery-form">
                    <Logo
                        color="rgb(255,255,255)"
                        text="Deep Learning Bank"
                    ></Logo>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email Address"
                    />
                    <button
                        className="Recovery-btn btn"
                        onClick={() => {
                            this.props.history.push('notfound');
                        }}
                    >
                        Reset Password
                    </button>
                </div>
                <div className="footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
                <div className="footer">
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        );
    }
}
export default Recovery;
