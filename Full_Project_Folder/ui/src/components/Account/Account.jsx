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
            savings: '',
            transaction_number: '',
            amount: '',
            date: '',
            location: '',
        };

        this.state = {
            savings: {
                1244221: [
                    {
                        transaction_number: '121212',
                        amount: '$500.00',
                        date: '01/14/2020',
                        location: 'ATM Berryessa',
                    },
                ],

                5355228: [
                    {
                        transaction_number: '634342',
                        amount: '$200.00',
                        date: '23/12/2020',
                        location: 'ATM N. Jackson',
                    },
                ],
            },
        };
    }

    savings(e) {}
    transaction_number(e) {}
    amount(e) {}
    date(e) {}
    location(e) {}

    render() {
        const {
            savings,
            transaction_number,
            amount,
            date,
            location,
        } = this.state;
        return (
            <div className="account">
                <UserNavigationBar />
                <div className="container">
                    <h1 id="saving">Savings 1234 $100.00"</h1>
                    <h2 id="title">Transactions</h2>
                    <table>
                        <thead>
                            <th>
                                <td>transaction_number</td>
                                <td>amount</td>
                                <td>date</td>
                                <td>location</td>
                            </th>
                        </thead>
                        <tbody>
                            {Object.keys(this.state.savings).map(
                                (transaction_number, key) => {
                                    return (
                                        <tr key={key}>
                                            {this.state.savings[
                                                transaction_number
                                            ].map((transaction, index) => {
                                                return (
                                                    <tr
                                                        key={
                                                            String(key) +
                                                            String(index)
                                                        }
                                                    >
                                                        <td>
                                                            {
                                                                transaction.transaction_number
                                                            }
                                                        </td>
                                                        <td>
                                                            {transaction.amount}
                                                        </td>
                                                        <td>
                                                            {transaction.date}
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.location
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Account;
