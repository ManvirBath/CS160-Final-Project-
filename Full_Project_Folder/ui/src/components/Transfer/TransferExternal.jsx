import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';
import Loader from 'react-loader-spinner';

class TransferExternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: localStorage.getItem('to_acct') || '',
            from_acct: '',
            routing_num: localStorage.getItem('routing_num') || '',
            amount: localStorage.getItem('amount') || '',
            memo: localStorage.getItem('memo') || '',

            errorToAcct: '',
            errorFromAcct: '',
            errorRouting: '',
            errorAmount: '',
            errorMemo: '',

            accts: [],
            others_accts: [],
            loading: true,
        };

        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.routing_num = this.routing_num.bind(this);
        this.amount = this.amount.bind(this);
        this.memo = this.memo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getClientAccounts() {
        try {
            const res = await axiosInstance.get('/accounts/');
            const d = res.data;
            this.setState({ accts: d });
            // console.log("Header AFTER: " + this.state.axiosInstance.defaults.headers['Authorization'])
            return res;
        } catch (error) {
            // console.log("Header: " + axiosInstance.defaults.headers['Authorization'])
            // console.log("Hello Client error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    async getOtherAccounts() {
        try {
            const res2 = await axiosInstance.get('/all_accounts/');
            const d = res2.data;
            this.setState({ others_accts: d });
            return res2;
        } catch (error) {
            throw error;
        }
    }

    async componentDidMount() {
        const client_accounts = await this.getClientAccounts();
        const other_accounts = await this.getOtherAccounts();
        this.setState({ loading: false });
    }

    to_acct(e) {
        this.setState({ to_acct: e.target.value });
        this.setState({ errorToAcct: '' });
    }
    from_acct(e) {
        this.setState({ from_acct: e.target.selectedOptions[0] });
        this.setState({ errorFromAcct: '' });
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
    routing_num(e) {
        this.setState({ routing_num: e.target.value });
        this.setState({ errorRouting: '' });
    }

    handleSubmit(e) {
        //validates to account
        if (this.state.to_acct === '') {
            e.preventDefault();
            this.setState({
                errorToAcct: 'Account number cannot be empty',
            });
        } else if (
            (this.state.to_acct.length > 8) |
            (this.state.to_acct.length < 8)
        ) {
            e.preventDefault();
            this.setState({
                errorToAcct: 'Account number must be 8 digits',
            });
        }
        if (this.state.to_acct.match(/^[0-9]*$/gm) == null) {
            e.preventDefault();
            this.setState({
                errorToAcct:
                    'Account number must contain only values 0-9 (inclusive)',
            });
        }

        //validates routing number
        if (this.state.routing_num === '') {
            e.preventDefault();
            this.setState({
                errorRouting: 'Routing number cannot be empty',
            });
        } else if (
            (this.state.routing_num.length > 9) |
            (this.state.routing_num.length < 9)
        ) {
            e.preventDefault();
            this.setState({
                errorRouting: 'Routing number must be 9 digits',
            });
        }

        if (this.state.routing_num.match(/^[0-9]*$/gm) == null) {
            e.preventDefault();
            this.setState({
                errorRouting:
                    'Routing number must contain only values 0-9 (inclusive)',
            });
        }
        //validates from account
        if (this.state.from_acct === '') {
            e.preventDefault();
            this.setState({
                errorFromAcct: 'Select an account to transfer from',
            });
        }

        //validates amount
        if (this.state.amount <= 0 || this.state.amount > 100000) {
            e.preventDefault();
            this.setState({
                errorAmount: 'Amount must be between 0.01 and 100,000!',
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
            this.state.errorRouting == '' &&
            this.state.errorMemo == ''
        ) {
            localStorage.setItem('to_acct', this.state.to_acct);
            localStorage.setItem('from_acct', this.state.from_acct.value);
            localStorage.setItem('routing_num', this.state.routing_num);
            localStorage.setItem('amount', this.state.amount);
            localStorage.setItem('memo', this.state.memo);
        }
    }

    render() {
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
            <div className="TransferExternal">
                <UserNavigationBar active={2} />
                <div className="greeting-ExternalTransfer">
                    External Transfer
                </div>
                <div className="Transfer-ExternalPage">
                    <div id="external-transferfrom">Transfer From</div>
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

                    <div className="inputDiv">
                        <div id="external-transferto">Transfer To</div>
                        <div className="transferinternal-inputDiv">
                            <input
                                type="text"
                                className="toAccountExternal"
                                id="external-accountNumber-div"
                                placeholder="Account Number"
                                onChange={this.to_acct}
                                value={this.state.to_acct}
                                class="form-control"
                            ></input>
                            <h6 className="error">{this.state.errorToAcct}</h6>
                            <input
                                type="text"
                                className="routingNum"
                                id="external-routingNumber-div"
                                placeholder="Routing Number"
                                onChange={this.routing_num}
                                value={this.state.routing_num}
                                class="form-control"
                            ></input>
                            <h6 className="error">{this.state.errorRouting}</h6>
                            <input
                                type="number"
                                className="amountInput"
                                id="external-amount-div"
                                min="0"
                                placeholder="$"
                                onChange={this.amount}
                                value={this.state.amount}
                                class="form-control"
                            ></input>
                            <h6 className="error">{this.state.errorAmount}</h6>

                            <div id="external-memo">Memo</div>
                            <textarea
                                type="text"
                                className="memoInput"
                                id="transfer-external-memoInput"
                                placeholder="Memo"
                                class="form-control"
                                value={this.state.memo}
                                onChange={this.memo}
                            />
                            <h6 className="error">{this.state.errorMemo}</h6>
                        </div>
                    </div>
                    <div className="nextBtn">
                        <Link
                            to={{
                                pathname: '/transferexternalconfirm',
                                to_acct: this.state.to_acct,
                                from_acct: this.state.from_acct.value,
                                routing_num: this.state.routing_num,
                                amount: this.state.amount,
                                memo: this.state.memo,
                            }}
                        >
                            <button
                                type="button"
                                class="btn btn-primary"
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

export default TransferExternal;
