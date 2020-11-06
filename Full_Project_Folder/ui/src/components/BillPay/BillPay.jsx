import React from 'react';
import './BillPay.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import { Button } from 'react-bootstrap';
import axiosInstance from '../../axios';

class BillPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: '',
            from_acct: '',
            routing_num: '',
            amount: '',
            frequency: '',
            pay_date: '',
            accts: [],
            errorToAcct: '',
            errorFromAcct: '',
            errorRouting: '',
            errorAmount: '',
            errorDate: '',
        };
        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.routing_num = this.routing_num.bind(this);
        this.amount = this.amount.bind(this);
        this.frequency = this.frequency.bind(this);
        this.pay_date = this.pay_date.bind(this);
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
        this.setState({ from_acct: e.target.selectedOptions[0] });
        this.setState({ errorFromAcct: '' });
    }
    amount(e) {
        this.setState({ amount: e.target.value });
        this.setState({ errorAmount: '' });
    }
    routing_num(e) {
        this.setState({ routing_num: e.target.value });
        this.setState({ errorRouting: '' });
    }
    frequency(e) {
        this.setState({ frequency: e.target.selectedOptions[0].text });
    }
    pay_date(e) {
        this.setState({ pay_date: e.target.value });
        this.setState({ errorDate: '' });
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
        //validate paydate (make sure date selected isn't in past)
        var today = new Date();
        var parts = this.state.pay_date.split('-');
        var selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);
        if (selectedDate < today) {
            e.preventDefault();
            this.setState({
                errorDate: 'Scheduled date cannot be in the past.',
            });
        }
        console.log(this.state.pay_date);
        if (this.state.pay_date == '') {
            e.preventDefault();
            this.setState({ errorDate: 'Select a date to pay bill' });
        }
    }

    render() {
        let userAccts = this.state.accts.map((v) => (
            <option value={v.account_num}>
                {v.account_type} {v.account_num}: {v.balance}
            </option>
        ));
        console.log(String(this.state.from_acct.value))
        return (
            <div className="BillPay">
                <UserNavigationBar />

                <h1 className="PageHeader">Bill Pay</h1>
                <div id="billpay-header">Bill Payment</div>
                <div className="billpay">
                    <h4 id="transfer-from">From</h4>
                    <select
                        className="accounts"
                        id="accounts"
                        class="btn btn-light dropdown-toggle"
                        onChange={this.from_acct}
                    >
                        <option value="acctNumFrom" disabled selected>
                            Transfer From
                        </option>
                        {userAccts}
                    </select>
                    <h6 className="error">{this.state.errorFromAcct}</h6>

                    <div className="inputDiv">
                        <h4 id="transfer-to">To</h4>
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
                            placeholder="Routing number"
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

                        <h4 id="billpay-date">Bill Payment Date</h4>
                        <input
                            class="form-control"
                            type="date"
                            value={this.state.pay_date}
                            id="pay-date-input"
                            onChange={this.pay_date}
                        />
                        <h6 className="error">{this.state.errorDate}</h6>

                        <h4 id="billpay-frequency">Frequency</h4>
                        <select
                            className="frequency"
                            class="btn btn-light dropdown-toggle"
                            onChange={this.frequency}
                        >
                            <option value="onetime" disabled selected>
                                One time
                            </option>
                        </select>
                    </div>
                    <div className="nextBtn">
                        <Link
                            to={{
                                pathname: '/billpayconfirm',
                                to_acct: this.state.to_acct,
                                from_acct: this.state.from_acct.value,
                                routing_num: this.state.routing_num,
                                amount: this.state.amount,
                                pay_date: this.state.pay_date,
                                frequency: this.state.frequency,
                            }}
                        >
                            <button
                                type="button"
                                class="btn btn-primary"
                                id="billpay-next"
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

export default BillPay;
