import React from 'react';
import './DepositCheck.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class DepositCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_account: '',
            to_account_num: '',
            amount: localStorage.getItem('amount') || '',
            memo: localStorage.getItem('memo') || '',
            check_image: '',
            file: null,

            errorAmount: '',
            errorAccount: '',
            errorCheck: '',

            accts: [],
        };
        this.to_account = this.to_account.bind(this);
        this.amount = this.amount.bind(this);
        this.memo = this.memo.bind(this);
        this.check_image = this.check_image.bind(this);
        this.file = this.check_image.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const accounts = await axiosInstance.get('/accounts/').then((res) => {
            const d = res.data;
            this.setState({ accts: d });
        });
    }

    to_account(e) {
        this.setState({ to_account: e.target.selectedOptions[0].text });
        this.setState({ errorAccount: '' });
    }
    amount(e) {
        //this.setState({ amount: parseFloat(e.target.value).toFixed(2) });
        this.setState({ amount: e.target.value });
        this.setState({ errorAmount: '' });
    }
    memo(e) {
        this.setState({ memo: e.target.value });
        this.setState({ errorMemo: '' });
    }
    check_image(e) {
        this.setState({
            check_image: e.target.value,
            file: URL.createObjectURL(e.target.files[0]),
        });
        this.setState({ errorCheck: '' });
    }

    handleSubmit(e) {
        let error = false;
        //validates check
        if (this.state.file == null) {
            error = true;
            e.preventDefault();
            this.setState({ errorCheck: 'Please upload a check!' });
        }
        //validates to account
        if (this.state.to_account === '') {
            error = true;
            e.preventDefault();
            this.setState({
                errorAccount:
                    'Please select an account to deposit the check to!',
            });
        }
        //validates amount
        if (this.state.amount <= 0 || this.state.amount > 100000) {
            error = true;
            e.preventDefault();
            this.setState({
                errorAmount: 'Amount must be between 0.01 and 100,000!',
            });
        }

        if (this.state.memo.length >= 50) {
            error = true;
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
            error = true;
            e.preventDefault();
            this.setState({
                errorMemo: 'Memo can only contain letters and numbers',
            });
        }
        if (error) {
        } else {
            localStorage.setItem('to_account', this.state.to_account);
            localStorage.setItem('amount', this.state.amount);
            localStorage.setItem('memo', this.state.memo);
            localStorage.setItem('file', this.state.file);
            localStorage.setItem('check_image', this.state.check_image);
            localStorage.setItem('to_account_num', this.state.to_account_num);
        }
    }
    render() {
        let userAccts = this.state.accts.map((v) => (
            <option value={v.account_num}>
                {v.account_type} {v.account_num}: {v.balance}
            </option>
        ));
        return (
            <div className="DepositCheck">
                <UserNavigationBar active={3} />
                <div className="greeting-depositcheck">Deposit Check </div>
                <div className="Deposit-Page">
                    <div className="Deposit-Page-lefthalf">
                        <h2 id="deposit-to">Deposit To</h2>
                        <select
                            className="accounts"
                            id="accounts"
                            class="btn btn-light dropdown-toggle"
                            onChange={this.to_account}
                        >
                            <option value="acctNumTo" disabled selected>
                                Deposit Money To
                            </option>
                            {userAccts}
                        </select>
                        <h6 className="error">{this.state.errorAccount}</h6>
                        <h2 id="deposit-amount">Amount</h2>
                        <input
                            type="number"
                            className="amountInput"
                            id="amount-input"
                            min="0"
                            placeholder="$"
                            onChange={this.amount}
                            value={this.state.amount}
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorAmount}</h6>
                        <h2 id="deposit-memo">Memo</h2>
                        <textarea
                            type="text"
                            className="memoInput"
                            id="memo-input"
                            placeholder="Memo"
                            class="form-control"
                            onChange={this.memo}
                            value={this.state.memo}
                        />
                        <h6 className="error">{this.state.errorMemo}</h6>
                    </div>
                    <div className="Deposit-Page-righthalf">
                        <h4 id="upload-check">Upload Check:</h4>
                        <input
                            type="file"
                            id="img"
                            className="checkImgPath"
                            accept="image/*"
                            onChange={this.check_image}
                            class="btn btn-secondary"
                        />
                        <h6 className="error">{this.state.errorCheck}</h6>
                        <img className="checkImg" src={this.state.file} />
                        <Link
                            to={{
                                pathname: '/depositcheckconfirm',
                                account: this.state.to_account,
                                amount: this.state.amount,
                                memo: this.state.memo,
                                file: this.state.file,
                                check_image: this.state.check_image,
                                to_account_num: this.state.to_account_num,
                            }}
                        >
                            <button
                                type="button"
                                class="btn btn-primary"
                                id="button-depositcheck"
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

export default DepositCheck;
