import React from 'react';
import './DepositCheck.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class DepositCheckConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_account:
                this.props.location.account ||
                localStorage.getItem('to_account'),
            to_account_num:
                this.props.location.to_account_num ||
                localStorage.getItem('to_account_num'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
            memo: this.props.location.memo || localStorage.getItem('memo'),
            check_image:
                this.props.location.check_image ||
                localStorage.getItem('check_image'),
            file: null,
        };
    }

    async check(e) {
        const to_curr_acc = await localStorage.getItem('to_account_num');
        localStorage.setItem('alert_type', 'alert alert-success');
        localStorage.setItem(
            'status_response',
            'Thank you for your deposit! Please contact us if you have any questions or concerns.'
        );
        axiosInstance
            .post(`accounts/${to_curr_acc}/deposit/`, {
                amount: localStorage.getItem('amount'),
                location: 'Online',
                memo: localStorage.getItem('memo'),
            })
            .catch((error) => {
                console.log(error.response.status);
                localStorage.setItem('alert_type', 'alert alert-danger');
                localStorage.setItem(
                    'status_response',
                    'ERROR: This was not a valid deposit. Please try again.'
                );
            });
      }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return (
                <Redirect to="managerdashboard" />
            )
        }
        
        return (
            <div className="DepositCheckConfirm">
                <UserNavigationBar active={3} />

                <div id="deposit-check-confirm">Confirm check deposit</div>
                <div id="deposit-check-confirmdetails">
                    Please confirm your details before submitting.
                </div>
                <div className="depositcheck-confirm-details">
                    <h4>Deposit to: {this.state.to_account_num}</h4>
                    <h4>Amount: {this.state.amount}</h4>
                    <h4>Memo: {this.state.memo}</h4>
                    <h4>Check file: {this.state.check_image}</h4>
                    <div className="buttons">
                        <Link to="/depositcheck">
                            <button type="button" class="btn btn-danger">
                                Don't make deposit
                            </button>
                        </Link>
                        <Link
                            to={{
                                pathname: '/depositchecktransaction',
                                account: this.state.account,
                                amount: this.state.amount,
                                memo: this.state.memo,
                                check_image: this.state.check_image,
                                to_account_num: this.state.to_account_num,
                            }}
                        >
                            <button type="button" class="btn btn-primary" onClick={this.check}>
                                Submit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DepositCheckConfirm;
