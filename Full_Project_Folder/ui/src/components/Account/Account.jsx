import React from "react";
import "./Account.css";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import UserNavigationBar from "../UserNavBar/UserNavBar";
import axiosInstance from "../../axios";

class Account extends React.Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
    this.state = {
      transaction_number: "",
      amount: "",
      date: "",
      trans_type: "",
      check_path: "",
      location: "",
      memo: "",
    };

    let savings = {
      1244221: [
        {
          transaction_number: "121212",
          amount: "500.00",
          date: "2020-10-31",
          trans_type: "Deposit",
          check_path: "C:fakepath\fakecheck.img",
          location: "Online",
          memo: "1st paycheck",
        },
      ],

      5355228: [
        {
          transaction_number: "634342",
          amount: "200.00",
          date: "2020-17-03",
          trans_type: "Withdraw",
          check_path: "",
          location: "ATM",
          memo: "",
        },
      ],
    };
  }

  transaction_number(e) {}
  amount(e) {}
  date(e) {}
  check_path(e) {}
  trans_type(e) {}
  location(e) {}
  memo(e) {}

  render() {
    return (
      <div className="Account">
        <UserNavigationBar />
        <h1 className="acctTypeName">Savings 1234</h1>
        <h4 className="acctBalance">Account Balance: $100.00</h4>
        <h2 id="title">Transactions</h2>
        <table>
          <tr>
            <th>Transaction Number</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Memo</th>
            <th>Location</th>
            <th>Check Path</th>
          </tr>
          <tr>
            <td>121212</td>
            <td>2020-10-31</td>
            <td>500.00</td>
            <td>Deposit</td>
            <td>1st paycheck</td>
            <td>Online</td>
            <td>C:fakepath\fakecheck.img</td>
          </tr>
          <tr>
            <td>634342</td>
            <td>2020-17-03</td>
            <td>200.00</td>
            <td>Withdraw</td>
            <td></td>
            <td>ATM</td>
            <td></td>
          </tr>
        </table>
      </div>
    );
  }
=======
        this.state = {
            transaction_number: '',
            amount: '',
            date: '',
            trans_type: '',
            check_path: '',
            location: '',
            memo: '',
        };

        let savings = {
            1244221: [
                {
                    transaction_number: '121212',
                    amount: '500.00',
                    date: '2020-10-31',
                    trans_type: 'Deposit',
                    check_path: 'C:fakepath\fakecheck.img',
                    location: 'Online',
                    memo: '1st paycheck',
                },
            ],

            5355228: [
                {
                    transaction_number: '634342',
                    amount: '200.00',
                    date: '2020-17-03',
                    trans_type: 'Withdraw',
                    check_path: '',
                    location: 'ATM',
                    memo: '',
                },
            ],
        };
    }

    transaction_number(e) {}
    amount(e) {}
    date(e) {}
    check_path(e) {}
    trans_type(e) {}
    location(e) {}
    memo(e) {}

    render() {
        return (
            <div className="Account">
                <UserNavigationBar />
                <h1 className="acctTypeName">Savings 1234</h1>
                <h4 className="acctBalance">Account Balance: $100.00</h4>
                <h2 id="account-title">Transactions</h2>
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
                    <tr>
                        <td>121212</td>
                        <td>2020-10-31</td>
                        <td>500.00</td>
                        <td>Deposit</td>
                        <td>1st paycheck</td>
                        <td>Online</td>
                        <td>C:fakepath\fakecheck.img</td>
                    </tr>
                    <tr>
                        <td>634342</td>
                        <td>2020-17-03</td>
                        <td>200.00</td>
                        <td>Withdraw</td>
                        <td></td>
                        <td>ATM</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
>>>>>>> 3ab784070f8decddb66fabeca1b90583839fe027
}

export default Account;
