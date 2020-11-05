import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

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
        };
        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.amount = this.amount.bind(this);
        this.memo = this.memo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axiosInstance.get('/accounts/').then((res) => {
            const d = res.data;
            this.setState({ accts: d });
        });
    }

    to_acct(e) {
        this.setState({ to_acct: e.target.selectedOptions[0].text });
        this.setState({ errorToAcct: '' });
        this.setState({ errorIsSameAcct: '' });
    }
    from_acct(e) {
        this.setState({ from_acct: e.target.selectedOptions[0].text });
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
        //validates amount
        if (this.state.amount <= 0) {
            e.preventDefault();
            this.setState({ errorAmount: 'Amount must be greater than 0' });
        }

        //checks if from and to account are the same
        if (this.state.to_acct === this.state.from_acct) {
            e.preventDefault();
            this.setState({
                errorIsSameAcct: 'Accounts cannot be the same!',
            });
        }
    }

    render() {
        let userAccts = this.state.accts.map((v) => (
            <option value={v.account_num}>
                {v.account_type} {v.account_num}: {v.balance}
            </option>
        ));
        return (
            <div className="TransferInternal">
                <UserNavigationBar active={2} />
                <div className="Transfer-InternalPage"></div>
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
                                from_acct: this.state.from_acct,
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
