import React from 'react';
import './Account.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction_arr: [],
        };
    }
    async getTransactions() {
        try {
            const res = await this.state.axiosInstance.get(
                `accounts/${this.props.location.account_num}/transactions/`
            );
            const d = res.data;
            this.setState({ transaction_arr: d });
            return res;
        } catch (error) {
            // console.log("Header AFTER: " + this.state.axiosInstance.defaults.headers['Authorization'])
            console.log('Hello error: ', JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }
    async componentDidMount() {
        this.state.axiosInstance = axiosInstance;
        const transactions = await this.getTransactions();
    }

    render() {
        let acctTransaction = this.state.transaction_arr.map((v, index) => (
            <tr>
                <th>{index + 1}</th>
                <th>{v.date}</th>
                <th>{v.amount}</th>
                <th>{v.trans_type}</th>
                <th>{v.memo}</th>
                <th>{v.location}</th>
                <th>{v.check_path}</th>
            </tr>
        ));
        return (
            <div className="Account">
                <UserNavigationBar active={0} />
                <h1 className="acctTypeName">
                    {this.props.location.acct_type}:{' '}
                    {this.props.location.account_num}
                </h1>
                <h4 className="acctBalance">
                    Account Balance: ${this.props.location.balance}
                </h4>
                <h2 id="account-title">Transactions</h2>
                <div className="account-table">
                    <table id="account-table">
                        <tr>
                            <th>Transaction Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Memo</th>
                            <th>Location</th>
                            <th>Check Path</th>
                        </tr>
                        {acctTransaction}
                    </table>
                </div>
            </div>
        );
    }
}

export default Account;
