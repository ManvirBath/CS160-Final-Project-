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
            amount: '',
            memo: '',
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

    componentDidMount() {
        axiosInstance.get('/accounts/').then((res) => {
            const d = res.data;
            this.setState({ accts: d });
        });
    }

    to_account(e) {
        this.setState({ to_account: e.target.selectedOptions[0].text });
        this.setState({ errorAccount: '' });
    }
    amount(e) {
        this.setState({ amount: parseFloat(e.target.value).toFixed(2) });
        this.setState({ errorAmount: '' });
    }
    memo(e) {
        this.setState({ memo: e.target.value });
    }
    check_image(e) {
        this.setState({
            check_image: e.target.value,
            file: URL.createObjectURL(e.target.files[0]),
        });
        this.setState({ errorCheck: '' });
    }

    handleSubmit(e) {
        //validates check
        if (this.state.file == null) {
            e.preventDefault();
            this.setState({ errorCheck: 'Please upload a check!' });
        }
        //validates to account
        if (this.state.to_account === '') {
            e.preventDefault();
            this.setState({
                errorAccount:
                    'Please select an account to deposit the check to!',
            });
        }
        //validates amount
        if (this.state.amount <= 0) {
            e.preventDefault();
            this.setState({ errorAmount: 'Amount must be greater than 0.00!' });
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
                            step="0.01"
                            placeholder="$"
                            onChange={this.amount}
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorAmount}</h6>
                        <h2 id="deposit-memo">Memo(optional)</h2>
                        <textarea
                            type="text"
                            className="memoInput"
                            id="memo-input"
                            placeholder="Memo"
                            class="form-control"
                            onChange={this.memo}
                        />
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
