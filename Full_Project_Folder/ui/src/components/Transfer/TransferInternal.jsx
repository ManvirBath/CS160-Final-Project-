import React from 'react';
import './Transfer.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';
import Loader from 'react-loader-spinner';


class TransferInternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: '',
            from_acct: '',
            amount: localStorage.getItem('amount') || '',
            memo: localStorage.getItem('memo') || '',

            errorToAcct: '',
            errorFromAcct: '',
            errorAmount: '',
            errorIsSameAcct: '',
            errorMemo: '',

            accts: [],
            axiosInstance: null,
            loading: true,
        };
        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.amount = this.amount.bind(this);
        this.memo = this.memo.bind(this);
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
        console.log(localStorage.getItem('to_acct'));
        console.log(localStorage.getItem('from_acct'));
        console.log(localStorage.getItem('amount'));
        console.log(localStorage.getItem('memo'));
    }

    to_acct(e) {
        this.setState({ to_acct: e.target.value });
        this.setState({ errorToAcct: '' });
        this.setState({ errorIsSameAcct: '' });
    }
    from_acct(e) {
        this.setState({ from_acct: e.target.selectedOptions[0] });
        this.setState({ errorFromAcct: '' });
        this.setState({ errorIsSameAcct: '' });
    }
    amount(e) {
        // STOPS USER TO TWO DECIMAL PLACES
        this.setState({ amount: e.target.value.toString().split(".").map((el,i)=>i?el.split("").slice(0,2).join(""):el).join(".") });
        this.setState({ errorAmount: '' });
    }

    memo(e) {
        this.setState({ memo: e.target.value });
        this.setState({ errorMemo: '' });
    }

    handleSubmit(e) {
        //validates from account
        if (this.state.from_acct === '') {
            e.preventDefault();
            this.setState({
                errorFromAcct: 'Select an account to transfer from',
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
        if (this.state.to_acct === this.state.from_acct.value) {
            e.preventDefault();
            this.setState({
                errorIsSameAcct: 'Accounts cannot be the same!',
            });
        }

        //validates amount
        if (this.state.amount <= 0 || this.state.amount > 100000) {
            e.preventDefault();
            this.setState({
                errorAmount: 'Amount must be between 0.01 and 100,000!',
            });
        } else if (this.state.from_acct !== '' && this.state.amount > parseFloat(this.state.from_acct.text.split(' ')[2])) {
            e.preventDefault();
            this.setState({
                errorAmount: 'Amount cannot be greater than the account balance.',
            });
        }
        //validates memo
        if (this.state.memo.length >= 50) {
            e.preventDefault();
            this.setState({
                errorMemo: 'Memo must be less than 50 characters long',
            });
        } else if (this.state.memo.length == '') {
            e.preventDefault();
            this.setState({
                errorMemo: 'Memo cannot be empty',
            });
        }
        if (this.state.memo.match(/^[A-Za-z0-9/ ]*$/gm) == null) {
            e.preventDefault();
            this.setState({
                errorMemo: 'Memo can only contain letters and numbers',
            });
        }

        if (
            this.state.errorToAcct == '' &&
            this.state.errorFromAcct == '' &&
            this.state.errorAmount == '' &&
            this.state.errorIsSameAcct == '' &&
            this.state.errorMemo == ''
        ) {
            localStorage.setItem('to_acct', this.state.to_acct);
            localStorage.setItem('from_acct', this.state.from_acct.value);
            localStorage.setItem('amount', this.state.amount);
            localStorage.setItem('memo', this.state.memo);
        }

        console.log(this.state.to_acct);
        console.log(this.state.from_acct.value);
        console.log(this.state.amount);
        console.log(this.state.memo);
    }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return (
                <Redirect to="managerdashboard" />
            )
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

        console.log(this.state.amount)
        
        return (
            <div className="TransferInternal">
                <UserNavigationBar active={2} />
                <div className="greeting-InternalTransfer">
                    Internal Transfer
                </div>
                <div className="Transfer-InternalPage">
                    <h6 className="error" id="same-error">
                        {this.state.errorIsSameAcct}
                    </h6>
                    <div id="internal-transerfrom">Transfer From</div>
                    <select
                        className="accounts"
                        id="accounts"
                        class="btn btn-light dropdown-toggle"
                        onChange={this.from_acct}
                    >
                        <option value="acctNumFrom" disabled selected>
                            Transfer Money From
                        </option>
                        {userAccts}
                    </select>
                    <h6 className="error">{this.state.errorFromAcct}</h6>

                    <div id="transfer-internal-transerto">Transfer To</div>
                    <select
                        className="accounts"
                        id="accounts1"
                        class="btn btn-light dropdown-toggle"
                        onChange={this.to_acct}
                    >
                        <option value="acctNumTo" disabled selected>
                            Transfer Money To
                        </option>
                        {userAccts}
                    </select>
                    <h6 className="error" id="transferto-error">
                        {this.state.errorToAcct}
                    </h6>

                    <div className="transferinternal-inputDiv">
                        <div id="internal-amount">Amount</div>
                        <input
                            type="number"
                            className="amountInput"
                            id="internal-amount-div"
                            min="0"
                            placeholder="$"
                            onChange={this.amount}
                            value={this.state.amount}
                            step=".01"
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorAmount}</h6>

                        <div id="transfer-internal-memo">Memo</div>
                        <textarea
                            type="text"
                            className="memoInput"
                            id="transfer-internal-memoInput"
                            placeholder="Memo"
                            value={this.state.memo}
                            class="form-control"
                            onChange={this.memo}
                        />
                        <h6 className="error">{this.state.errorMemo}</h6>
                    </div>
                    <div className="nextBtn">
                        <Link
                            to={{
                                pathname: '/transferinternalconfirm',
                                to_acct: this.state.to_acct,
                                from_acct: this.state.from_acct.value,
                                amount: this.state.amount,
                                memo: this.state.memo,
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

export default TransferInternal;
