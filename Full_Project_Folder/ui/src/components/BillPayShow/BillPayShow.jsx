import React, { useState } from 'react';
import './BillPayShow.css';
import Logo from '../Logo';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import Loader from "react-loader-spinner";

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
            loading: true
        };
    }

    async getBillPayments() {
        try {
            const res2 = await axiosInstance.get('/bill_payments');
            let loaded_bills = res2.data;
            this.setState({ bill_payments: loaded_bills});
            return res2;
        } catch (error) {
            // console.log("Header: " + axiosInstance.defaults.headers['Authorization'])
            // console.log("Hello Client error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    async componentDidMount() {
        const bills = await this.getBillPayments()
        this.setState({ loading: false }) 
    }
    
    render() {

        let paymentTemplate = this.state.bill_payments.map((v) => (
            <div className="box-userdb">
                <div key={v.id} className="accounts-container">
                    <div className={v.to_account_num} id="accounts-info">
                        <div id="userdb-account-type">To Account Number: {v.to_account_num}</div>

                        <div id="userdb-account-balance">${v.amount}</div>
                        <div id="userdb-account-number">{v.account.split( '/' )[5]}</div>
                        <div id="userdb-account-number">{v.date}</div>

                        <div id="userdb-bal">Amount</div>
                    </div>
                </div>

                <Link
                        to={{
                            pathname: `/billpayedit/${v.id}`,
                            to_acct: v.to_account_num,
                            from_acct: v.account.split( '/' )[5],
                            routing_num: v.routing_num,
                            amount: v.amount,
                            pay_date: v.date,
                            frequency: this.state.frequency,
                        }}
                    >
                        <button type="button" class="btn btn-primary">
                            Edit
                        </button>
                    </Link>
                
                    <Link
                        to={{
                            pathname: `/billpaycancel_confirm/${v.id}`,
                            to_acct: v.to_account_num,
                            from_acct: v.account.split( '/' )[5],
                            routing_num: v.routing_num,
                            amount: v.amount,
                            pay_date: v.date,
                            frequency: this.state.frequency,
                        }}
                    >
                        <button type="button" class="btn btn-danger">
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
            )
        }

        return (
            <div className="userdashboard">
                <UserNavigationBar active={1} />
                <div className="container-userdash">
                    <div className="flexbox-column-userdb">
                        <div id="personalaccount-userdb">Bill Payments</div>
                        <div className="scrollbox-userdb">
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
