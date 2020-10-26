import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class TransferExternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: '',
            from_acct: '',
            routing_num: '123456789',
            amount: '',
            memo: '',
        };
        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.routing_num = this.routing_num.bind(this);
        this.amount = this.amount.bind(this);
        this.memo = this.memo.bind(this);
    }

    to_acct(e) {
        this.setState({ to_acct: e.target.value });
        //console.log(this.state.to_acct);
    }
    from_acct(e) {
        this.setState({ from_acct: e.target.selectedOptions[0].text });
        //console.log(e.target.value);
    }
    amount(e) {
        this.setState({ amount: e.target.value });
    }
    memo(e) {
        this.setState({ memo: e.target.value });
    }
    routing_num(e) {
        this.setState({ routing_num: e.target.value });
    }

    render() {
        return (
            <div className="TransferExternal">
                <UserNavigationBar />

                <h1 className="PageHeader">
                    Transfer Between External Accounts
                </h1>
                <div className="transfer">
                    <h2>From</h2>
                    <select
                        className="accounts"
                        id="accounts"
                        class="btn btn-light dropdown-toggle"
                        onChange={this.from_acct}
                    >
                        <option value="acctNumFrom" disabled selected>
                            Transfer Money From:
                        </option>
                        <option value="Account1">Savings Account 123</option>
                        <option value="Account2">Savings Account 345</option>
                        <option value="Account3">Checking Account 678</option>
                    </select>

                    <div className="inputDiv">
                        <h2>To</h2>
                        <input
                            type="text"
                            className="toAccountExternal"
                            defaultValue="Transfer Money To"
                            onChange={this.to_acct}
                            class="form-control"
                        ></input>
                        <h2>Routing Number</h2>
                        <input
                            type="text"
                            className="routingNum"
                            defaultValue="123456789"
                            onChange={this.routing_num}
                            class="form-control"
                        ></input>
                        <h2>Amount</h2>
                        <input
                            type="text"
                            className="amountInput"
                            placeholder="$"
                            onChange={this.amount}
                            class="form-control"
                        ></input>

                        <h2>Memo(optional)</h2>
                        <textarea
                            type="text"
                            className="memoInput"
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
                            <button type="button" class="btn btn-primary">
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
