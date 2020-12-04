import React, { useState } from 'react';
import './Withdraw.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import Loader from 'react-loader-spinner';

class Withdraw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from_acct: '',
            amount: localStorage.getItem('amount') || '',

            errorFromAcct: '',
            errorAmount: '',

            accts: [],
            axiosInstance: null,
            loading: true,
        };
        this.from_acct = this.from_acct.bind(this);
        this.amount = this.amount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async getClientAccounts() {
        try {
            const res = await axiosInstance.get('/accounts/');
            const d = res.data;
            this.setState({ accts: d });
            return res;
        } catch (error) {
            throw error;
        }
    }

    async componentDidMount() {
        const clients = await this.getClientAccounts();
        this.setState({ loading: false });
        console.log(localStorage.getItem('from_acct'));
        console.log(localStorage.getItem('amount'));
    }

    from_acct(e) {
        this.setState({ from_acct: e.target.selectedOptions[0] });
        this.setState({ errorFromAcct: '' });
        this.setState({ errorIsSameAcct: '' });
    }
    amount(e) {
        // STOPS USER TO TWO DECIMAL PLACES
        this.setState({
            amount: e.target.value
                .toString()
                .split('.')
                .map((el, i) => (i ? el.split('').slice(0, 2).join('') : el))
                .join('.'),
        });
        this.setState({ errorAmount: '' });
    }
    handleSubmit(e) {
        //validates from account
        if (this.state.from_acct === '') {
            e.preventDefault();
            this.setState({
                errorFromAcct: 'Select an account to withdraw from',
            });
        }

        //validates amount
        if (this.state.amount <= 0.01 || this.state.amount > 100000) {
            e.preventDefault();
            this.setState({
                errorAmount: 'Amount must be between 0.01 and 100,000!',
            });
        } else if (
            this.state.from_acct !== '' &&
            this.state.amount >
            parseFloat(this.state.from_acct.text.split(' ')[2])
        ) {
            e.preventDefault();
            this.setState({
                errorAmount:
                    'Amount cannot be greater than the account balance.',
            });
        }

        if (
            this.state.errorFromAcct == '' &&
            this.state.errorAmount == '' 
        ) {
            localStorage.setItem('from_acct', this.state.from_acct.value);
            localStorage.setItem('amount', this.state.amount);
        }
    }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return <Redirect to="managerdashboard" />;
        }

        if (this.state.loading) {
            return (
                <div>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            );
        }

        let userAccts = this.state.accts.map((v) =>
            v.account_num == this.state.from_acct ? (
                <option value={v.account_num} selected>
                    {v.account_type} {v.account_num}: {v.balance}
                </option>
            ) : (
                <option value={v.account_num}>
                    {v.account_type} {v.account_num}: {v.balance}
                </option>
            )
        );
        return (
            <div className="Withdraw">
                <UserNavigationBar active={3} />;
                <div className="greeting-withdraw">Withdraw Money</div>
                <div className="withdrawPage">
                    <div id="withdrawfrom">Withdraw From</div>
                    <select
                        className="accounts"
                        id="accounts"
                        class="btn btn-light dropdown-toggle"
                        onChange={this.from_acct}
                    >
                        <option value="acctNumFrom" disabled selected>
                            Withdraw Money From
                        </option>
                        {userAccts}
                    </select>
                    <h6 className="error">{this.state.errorFromAcct}</h6>

                    <div className="withdraw-inputDiv">
                        <div id="withdraw-amount">Amount</div>
                        <input
                            type="number"
                            className="amountInput"
                            id="withdraw-amount-div"
                            min="0"
                            placeholder="$"
                            onChange={this.amount}
                            value={this.state.amount}
                            step=".01"
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorAmount}</h6>
                    </div>
                    <div className="nextBtn">
                        <Link
                            to={{
                                pathname: '/withdrawconfirm',
                                from_acct: this.state.from_acct.value,
                                amount: this.state.amount,
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-primary"
                                id="btn-primary"
                                onClick={this.handleSubmit}
                            >
                                Next
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Withdraw;
