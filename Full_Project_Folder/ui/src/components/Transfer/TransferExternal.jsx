import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class TransferExternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: '',
            from_acct: '',
            routing_num: '',
            amount: '',
            memo: '',
            errorToAcct: '',
            errorFromAcct: '',
            errorRouting: '',
            errorAmount: '',
            accts: [],
        };
        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.routing_num = this.routing_num.bind(this);
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
        this.setState({ to_acct: e.target.value });
        this.setState({ errorToAcct: '' });
    }
    from_acct(e) {
        this.setState({ from_acct: e.target.selectedOptions[0].text });
        this.setState({ errorFromAcct: '' });
    }
    amount(e) {
        this.setState({ amount: e.target.value });
        this.setState({ errorAmount: '' });
    }
    memo(e) {
        this.setState({ memo: e.target.value });
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
            (this.state.to_acct.length > 9) |
            (this.state.to_acct.length < 9)
        ) {
            e.preventDefault();
            this.setState({
                errorToAcct: 'Account number must be 9 digits',
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
            <div className="TransferExternal">
                <div id="active-transfer-external">
                    <UserNavigationBar active={2} />
                </div>

                <h1 className="PageHeader"></h1>
                <div id="transfer-external-header">External Transfer</div>
                <div className="transfer">
                    <h2 id="external-transferfrom">Transfer From</h2>
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
                        <h2 id="external-transferto">Transfer To</h2>
                        <input
                            type="text"
                            className="toAccountExternal"
                            placeholder="Account Number"
                            onChange={this.to_acct}
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorToAcct}</h6>
                        <input
                            type="text"
                            className="routingNum"
                            placeholder="Routing Number"
                            onChange={this.routing_num}
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorRouting}</h6>
                        <input
                            type="text"
                            className="amountInput"
                            placeholder="Amount"
                            onChange={this.amount}
                            class="form-control"
                        ></input>
                        <h6 className="error">{this.state.errorAmount}</h6>

                        <h2 id="external-memo">Memo(optional)</h2>
                        <textarea
                            type="text"
                            className="memoInput"
                            id="external-memoInput"
                            placeholder="Memo"
                            class="form-control"
                            onChange={this.memo}
                        />
                    </div>
                    <div className="nextBtn">
                        <Link
                            to={{
                                pathname: '/transferexternalconfirm',
                                to_acct: this.state.to_acct,
                                from_acct: this.state.from_acct,
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
