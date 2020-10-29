import React from 'react';
import './BillPay.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import { Button } from 'react-bootstrap';

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
        };
        this.to_acct = this.to_acct.bind(this);
        this.from_acct = this.from_acct.bind(this);
        this.routing_num = this.routing_num.bind(this);
        this.amount = this.amount.bind(this);
        this.frequency = this.frequency.bind(this);
        this.pay_date = this.pay_date.bind(this);
    }

    to_acct(e) {
        this.setState({ to_acct: e.target.value });
    }
    from_acct(e) {
        this.setState({ from_acct: e.target.selectedOptions[0].text });
    }
    amount(e) {
        this.setState({ amount: e.target.value });
    }
    routing_num(e) {
        this.setState({ routing_num: e.target.value });
    }
    frequency(e) {
        this.setState({ frequency: e.target.selectedOptions[0].text });
    }
    pay_date(e) {
        this.setState({ pay_date: e.target.value });
    }

    render() {
        return (
            <div className="contain-billpay">
                <div className="BillPay">
                    <UserNavigationBar />

                    <h1 className="PageHeader"></h1>
                    <div id="billpay-header">Bill Payment</div>
                    <div className="billpay">
                        <h4>Transfer From</h4>
                        <select
                            className="accounts"
                            id="accounts"
                            class="btn btn-light dropdown-toggle"
                            onChange={this.from_acct}
                        >
                            <option value="acctNumFrom">
                                Savings Account 123
                            </option>
                            <option value="Account2">
                                Savings Account 345
                            </option>
                            <option value="Account3">
                                Checking Account 678
                            </option>
                        </select>

                        <div className="inputDiv">
                            <h4>Transfer To</h4>
                            <input
                                type="text"
                                className="toAccountExternal"
                                placeholder="Account Number"
                                onChange={this.to_acct}
                                class="form-control"
                            ></input>

                            <input
                                type="text"
                                className="routingNum"
                                placeholder="Routing Number"
                                onChange={this.routing_num}
                                class="form-control"
                            ></input>
                            <input
                                type="text"
                                className="amountInput"
                                placeholder="Amount"
                                onChange={this.amount}
                                class="form-control"
                            ></input>
                            <div className="inputDiv2">
                                <h4>Bill Payment Date</h4>
                                <input
                                    class="form-control"
                                    type="date"
                                    value={this.state.pay_date}
                                    id="pay-date-input"
                                    onChange={this.pay_date}
                                />
                            </div>
                            <div className="inputDiv3">
                                <h4>Frequency</h4>
                                <select
                                    className="frequency"
                                    class="btn btn-light dropdown-toggle"
                                    onChange={this.frequency}
                                >
                                    <option value="">One time</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        </div>
                        <div className="nextBtn">
                            <Link
                                to={{
                                    pathname: '/billpayconfirm',
                                    to_acct: this.state.to_acct,
                                    from_acct: this.state.from_acct,
                                    routing_num: this.state.routing_num,
                                    amount: this.state.amount,
                                    pay_date: this.state.pay_date,
                                    frequency: this.state.frequency,
                                }}
                            >
                                <button type="button" class="btn btn-primary">
                                    Next
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BillPay;
