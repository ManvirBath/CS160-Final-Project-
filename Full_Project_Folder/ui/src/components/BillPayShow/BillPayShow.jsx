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
            <div key={v.id} className="acctBox">
                <div className={v.to_account_num} id="acct-info">
                    {v.to_account_num} ${v.amount}
                    <div id="bal">{v.date} Balance</div>
                </div>

                
                <Link
                        to={{
                            pathname: `/billpayedit/${v.id}`
                        }}
                    >
                        <button type="button" class="btn btn-primary">
                            Edit
                        </button>
                    </Link>
                
                <button type="button" class="btn btn-danger">
                    Cancel
                </button>
            </div>
        ));
        const { name, saving, checking } = this.state;

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
                    <div id="greeting-userdash2">Personal Bills</div>
                        {paymentTemplate}
                </div>
            </div>
        );
    }
}
export default BillPayShow;
