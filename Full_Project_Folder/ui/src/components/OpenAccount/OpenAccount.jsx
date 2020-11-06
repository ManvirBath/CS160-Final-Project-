import React from 'react';
import './OpenAccount.css';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class OpenAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acctType: '',
            errorAcctOption: '',
        };
        this.acctType = this.acctType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    acctType(e) {
        this.setState({ acctType: e.target.value });
        this.setState({ errorAcctOption: '' });
    }

    handleSubmit(e) {
        if (this.state.acctType === '') {
            e.preventDefault();
            this.setState({ errorAcctOption: 'Select an option' });
        } else {
            /*axiosInstance.post("create_account/", {
        account_type: this.state.acctType,
      });*/
        }
    }
    render() {
        return (
            <div className="OpenAccount">
                <UserNavigationBar active={0} />
                <div id="openacct-greeting">Open Account</div>
                <div className="openacct">
                    <div id="openacct-option">
                        Which type of account would you like to open?
                    </div>
                    <div className="openaccount-types">
                        <select
                            className="accttype"
                            id="accounts"
                            class="btn btn-light dropdown-toggle"
                            onChange={this.acctType}
                        >
                            <option value="default" disabled selected>
                                Account Type
                            </option>
                            <option value="checking">Checking Account</option>
                            <option value="savings">Savings Account</option>
                        </select>
                        <h6 className="error">{this.state.errorAcctOption}</h6>
                        <div className="openaccount-nextBtn">
                            <Link
                                to={{
                                    pathname: '/userdashboard',
                                }}
                            >
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    onClick={this.handleSubmit}
                                >
                                    Open Account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OpenAccount;
