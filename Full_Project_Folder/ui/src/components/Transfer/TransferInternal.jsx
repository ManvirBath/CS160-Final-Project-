import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';
import Loader from "react-loader-spinner";

class TransferInternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: '',
            from_acct: '',
            amount: '',
            memo: '',
            errorToAcct: '',
            errorFromAcct: '',
            errorAmount: '',
            errorIsSameAcct: '',
            accts: [],
            others_accts: [],
            axiosInstance: null,
            loading: true
        };
        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.amount = this.amount.bind(this);
        this.memo = this.memo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getClientAccounts(){
        try {
            const res = await axiosInstance.get('/accounts/')
            const d = res.data;
            this.setState({ accts: d });
            // for (var index = 0; index < localStorage.getItem('user'); index++) {
            //     console.log(localStorage.getItem('user').email)
            // }
            // console.log("Header AFTER: " + this.state.axiosInstance.defaults.headers['Authorization'])
            return res
        } catch(error){
            // console.log("Header: " + axiosInstance.defaults.headers['Authorization'])
            // console.log("Hello Client error: ", JSON.stringify(error, null, 4));
            throw error
        }
    }

    async getOtherAccounts(){
        try {
            const res2 = await axiosInstance.get('/all_accounts/')
            const d = res2.data;
            this.setState({ others_accts: d });
            return res2
        } catch(error){
            throw error
        }
    }

    async componentDidMount() {
        const clients = await this.getClientAccounts()
        const accounts = await this.getOtherAccounts()
        this.setState({ loading: false }) 
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
        this.setState({ amount: e.target.value });
        this.setState({ errorAmount: '' });
    }
    memo(e) {
        this.setState({ memo: e.target.value });
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

        if (!this.state.others_accts.some(v => (v.account_num === this.state.to_acct))) {
            /* vendors contains the element we're looking for */
            e.preventDefault();
            this.setState({
                errorToAcct: 'Account unavailable',
            });
          }
        
        //validates amount
        if (this.state.amount <= 0) {
            e.preventDefault();
            this.setState({ errorAmount: 'Amount must be greater than 0' });
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
            )
        }

        
        const userAccts = this.state.accts.map((v) => (
            <option value={v.account_num}>
                {v.account_type} {v.account_num}: {v.balance}
            </option>
        ));

        return (
            <div className="TransferInternal">
                <UserNavigationBar />
                <h1 className="PageHeader"></h1>
                <div id="transfer-internal-header">Internal Transfer</div>
                <div className="transfer">
                    <h6 className="error" id="same-error">
                        {this.state.errorIsSameAcct}
                    </h6>
                    <h2 id="internal-transerfrom">Transfer From</h2>
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

                    <h2 id="transfer-internal-transerto">Transfer To</h2>
                    <input
                        type="text"
                        className="accounts"
                        placeholder="#"
                        onChange={this.to_acct}
                        class="form-control"
                    ></input>
                    <h6 className="error" id="transferto-error">
                        {this.state.errorToAcct}
                    </h6>

                    <div className="inputDiv">
                        <h2 id="internal-amount">Amount</h2>
                        <input
                            type="text"
                            className="amountInput"
                            placeholder="$"
                            onChange={this.amount}
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorAmount}</h6>

                        <h2 id="transfer-internal-memo">Memo(optional)</h2>
                        <textarea
                            type="text"
                            className="memoInput"
                            id="memoInput"
                            placeholder="Memo"
                            class="form-control"
                            onChange={this.memo}
                        />
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
