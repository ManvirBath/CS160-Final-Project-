import React from 'react';
import './CloseAccount.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class CloseAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeAcct: '',
            to_acct: '',
            errorCloseAcct: '',
            errorToAcct: '',
            accts: [],
        };
        this.closeAcct = this.closeAcct.bind(this);
        this.to_acct = this.to_acct.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*componentDidMount() {
    axiosInstance.get("/accounts/").then((res) => {
      const d = res.data;
      this.setState({ accts: d });
    });
  }*/

    closeAcct(e) {
        this.setState({ closeAcct: e.target.value });
        this.setState({ errorCloseAcct: '' });
    }

    to_acct(e) {
        this.setState({ to_acct: e.target.value });
        this.setState({ errorToAcct: '' });
        this.setState({ errorIsSameAcct: '' });
    }

    handleSubmit(e) {
        //validates close account
        if (this.state.closeAcct === '') {
            e.preventDefault();
            this.setState({
                errorCloseAcct: 'Select an account to close',
            });
        }
        //validates to account
        if (this.state.to_acct === '') {
            e.preventDefault();
            this.setState({
                errorToAcct: 'Select an account to transfer from',
            });
        }
        //checks if from and to account are the same
        if (this.state.to_acct === this.state.closeAcct) {
            e.preventDefault();
            this.setState({
                errorIsSameAcct: 'Accounts cannot be the same!',
            });
        }
        if (
            (this.state.errorCloseAcct === '') &
            (this.state.errorToAcct === '') &
            (this.state.errorIsSameAcct === '')
        ) {
            axiosInstance
                .post('accounts/' + this.state.closeAccount + '/close_account/')
                .then((res) => {});
        }
    }

    render() {
        let userAccts = this.state.accts.map((v) => (
            <option value={v.account_num}>
                {v.account_type} {v.account_num}: {v.balance}
            </option>
        ));
        return (
            <div className="closeAccount">
                <UserNavigationBar active={0} />
                <div id="closeacct-greeting">Close Account</div>
                <div className="closeacct">
                    <div id="closeacct-option">
                        Which account do you want to close?
                    </div>
                    <div className="closeaccount-types">
                        <select
                            className="accounts"
                            id="accounts"
                            class="btn btn-light dropdown-toggle"
                            onChange={this.closeAcct}
                        >
                            <option value="default" disabled selected>
                                Account to close
                            </option>
                            {userAccts}
                        </select>
                        <h6 className="error">{this.state.errorCloseAcct}</h6>
                        <div className="closeaccount-nextBtn">
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
                                    Close Account
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CloseAccount;
