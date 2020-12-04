import React, { useState } from 'react';
import './BillPayEdit.css';
import Logo from '../Logo';
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

class BillPayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.id || localStorage.getItem('bill_id'),
            bill_payment: [],

            to_acct:
                this.props.location.to_acct || localStorage.getItem('to_acct'),
            from_acct:
                this.props.location.from_acct ||
                localStorage.getItem('from_acct'),
            routing_num:
                this.props.location.routing_num ||
                localStorage.getItem('routing_num'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
            pay_date:
                this.props.location.pay_date ||
                localStorage.getItem('pay_date'),
            frequency:
                this.props.location.frequency ||
                localStorage.getItem('frequency'),

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

    async componentDidMount() {
        // const bills = await this.getBillPayments()
        console.log(this.props.location.id);
        const accounts = await axiosInstance.get('/accounts/').then((res) => {
            const d = res.data;
            this.setState({
                accts: d,
                from_acct: this.state.from_acct,
            });
        });

        const setFrom = await this.state.accts.map((v) =>
            v.account_num == localStorage.getItem('from_acct') ? (
                localStorage.setItem('limit', v.balance)
            ) : (
                console.log("Hello")
            )
        );

        console.log(localStorage.getItem('bill_id'));
        console.log(localStorage.getItem('to_acct'));
        console.log(localStorage.getItem('from_acct'));
        console.log(localStorage.getItem('routing_num'));
        console.log(localStorage.getItem('amount'));
        console.log(localStorage.getItem('pay_date'));
        console.log(localStorage.getItem('frequency'));
    }

    to_acct(e) {
        this.setState({ to_acct: e.target.value, errorToAcct: '' });
    }
    from_acct(e) {
        this.setState({
            from_acct: e.target.selectedOptions[0],
            errorFromAcct: '',
        });
    }
    amount(e) {
        // STOPS USER TO TWO DECIMAL PLACES
        this.setState({
            amount: e.target.value
                .toString()
                .split('.')
                .map((el, i) => (i ? el.split('').slice(0, 2).join('') : el))
                .join('.'),
            errorAmount: '',
        });
    }
    routing_num(e) {
        this.setState({ routing_num: e.target.value, errorRouting: '' });
    }
    frequency(e) {
        this.setState({ frequency: e.target.selectedOptions[0].text });
    }
    pay_date(e) {
        this.setState({ pay_date: e.target.value, errorDate: '' });
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
        } else if (
            this.state.from_acct !== '' &&
            this.state.amount >
            localStorage.getItem('limit')
        ) {
            e.preventDefault();
            this.setState({
                errorAmount:
                    'Amount cannot be greater than the account balance.',
            });
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

        if (
            this.state.errorToAcct == '' &&
            this.state.errorFromAcct == '' &&
            this.state.errorRouting == '' &&
            this.state.errorAmount == '' &&
            this.state.errorDate == ''
        ) {
            console.log('Hello');
            localStorage.setItem('to_acct', this.state.to_acct);
            localStorage.setItem('from_acct', this.state.from_acct);
            localStorage.setItem('routing_num', this.state.routing_num);
            localStorage.setItem('amount', this.state.amount);
            localStorage.setItem('frequency', this.state.frequency);
            localStorage.setItem('pay_date', this.state.pay_date);
        }
    }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return <Redirect to="/managerdashboard" />;
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
            <div className="BillPayEdit">
                <UserNavigationBar active={1} />
                <div className="container-billpay">
                    <div className="greeting-billpayedit">Edit BillPay</div>
                    <div className="flexbox-column-billpay">
                        <div id="transfer-from">From</div>
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

                        <div className="billpay-inputDiv">
                            <div id="transfer-to">To</div>
                            <input
                                type="text"
                                className="toAccountExternal"
                                placeholder="Account Number"
                                onChange={this.to_acct}
                                value={this.state.to_acct}
                                class="form-control"
                            ></input>
                            <h6 className="error">{this.state.errorToAcct}</h6>

                            <input
                                type="text"
                                className="routingNum"
                                placeholder="Routing number"
                                onChange={this.routing_num}
                                value={this.state.routing_num}
                                class="form-control"
                            ></input>
                            <h6 className="error">{this.state.errorRouting}</h6>

                            <input
                                type="text"
                                className="amountInput"
                                placeholder="Amount"
                                onChange={this.amount}
                                value={this.state.amount}
                                class="form-control"
                            ></input>
                            <h6 className="error">{this.state.errorAmount}</h6>

                            <div id="billpay-date">Bill Payment Date</div>
                            <input
                                class="form-control"
                                type="date"
                                value={this.state.pay_date}
                                id="pay-date-input"
                                onChange={this.pay_date}
                            />
                            <h6 className="error">{this.state.errorDate}</h6>

                            <div id="billpay-frequency">Frequency</div>
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
                    </div>
                    <div className="billpay-buttons">
                        <Link
                            to={{
                                pathname: `/billpayedit_confirm/${this.state.id}`,
                                to_acct: this.state.to_acct,
                                from_acct: this.state.from_acct,
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

export default BillPayEdit;
