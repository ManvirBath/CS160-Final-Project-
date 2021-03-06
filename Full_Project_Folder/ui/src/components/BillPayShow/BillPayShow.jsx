import React, { useState } from 'react';
import './BillPayShow.css';
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

class BillPayShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_acct: '',
            from_acct: '',
            routing_num: '',
            amount: '',
            frequency: '',
            pay_date: '',
            bill_payments: [],
            loading: true,
        };
    }

    async getBillPayments() {
        try {
            const res2 = await axiosInstance.get('/bill_payments');
            let loaded_bills = res2.data;
            this.setState({ bill_payments: loaded_bills, loading: false });
            return res2;
        } catch (error) {
            // console.log("Header: " + axiosInstance.defaults.headers['Authorization'])
            // console.log("Hello Client error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    async componentDidMount() {
        const bills = await this.getBillPayments();
        localStorage.removeItem('bill_id');
        localStorage.removeItem('to_acct');
        localStorage.removeItem('from_acct');
        localStorage.removeItem('routing_num');
        localStorage.removeItem('amount');
        localStorage.removeItem('pay_date');
        localStorage.removeItem('frequency');
        localStorage.removeItem('limit')
        this.setState({ loading: false });
    }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return (
                <Redirect to="/managerdashboard" />
            )
        }

        let paymentTemplate = this.state.bill_payments.map((v) => (
            <div className="box-billpayshow">
                <div key={v.id} className="billpayshow-container">
                    <div className={v.to_account_num} id="payments-info">
                        <div className="contain-billpayshow">
                            <div id="billpayshow-account-type">
                                To Account Number: {v.to_account_num}
                            </div>

                            <div id="billpayshow-account-balance">
                                Bill Amount: ${v.amount}
                            </div>
                            <div id="billpayshow-account-number">
                                Routing Number: {v.routing_num}
                            </div>
                            <div id="billpayshow-account-number">
                                Date: {v.date}
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    to={{
                        pathname: `/billpayedit/${v.id}`,
                        id: v.id,
                        to_acct: v.to_account_num,
                        from_acct: v.account.split('/')[5],
                        routing_num: v.routing_num,
                        amount: v.amount,
                        pay_date: v.date,
                        frequency: this.state.frequency,
                    }}
                >
                    <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={() => {
                            localStorage.setItem('to_acct', v.to_account_num);
                            localStorage.setItem(
                                'from_acct',
                                v.account.split('/')[5]
                            );
                            localStorage.setItem('routing_num', v.routing_num);
                            localStorage.setItem('amount', v.amount);
                            localStorage.setItem('pay_date', v.date);
                            localStorage.setItem('bill_id', v.id);
                        }}
                    >
                        Edit
                    </button>
                </Link>

                <Link
                    to={{
                        pathname: `/billpaycancel_confirm/${v.id}`,
                        to_acct: v.to_account_num,
                        from_acct: v.account.split('/')[5],
                        routing_num: v.routing_num,
                        amount: v.amount,
                        pay_date: v.date,
                        frequency: this.state.frequency,
                    }}
                >
                    <button
                        type="submit"
                        class="btn btn-danger"
                        onClick={() => {
                            localStorage.setItem('to_acct', v.to_account_num);
                            localStorage.setItem(
                                'from_acct',
                                v.account.split('/')[5]
                            );
                            localStorage.setItem('routing_num', v.routing_num);
                            localStorage.setItem('amount', v.amount);
                            localStorage.setItem('pay_date', v.date);
                            localStorage.setItem(
                                'frequency',
                                this.state.frequency
                            );
                            localStorage.setItem('bill_id', v.id);
                        }}
                    >
                        Cancel
                    </button>
                </Link>
            </div>
        ));

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

        console.log(this.state.bill_payments)
        return (
            <div className="BillPayShow">
                <UserNavigationBar active={1} />
                <div className="container-billpayshow">
                    <div className="flexbox-column-billpayshow">
                        <div className="greeting-billpayshow">
                            Bill Payments
                        </div>
                        <div className="scrollbox-billpayshow">
                            <div className="accounts-container">
                                {paymentTemplate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BillPayShow;
