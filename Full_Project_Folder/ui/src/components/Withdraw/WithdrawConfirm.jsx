import React from 'react';
import './Withdraw.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
} from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class WithdrawConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            from_acct:
                this.props.location.from_acct ||
                localStorage.getItem('from_acct'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
        };
    }

    async check(e) {
        const from_curr_acc = await localStorage.getItem('from_acct');
        localStorage.setItem('alert_type', 'alert alert-success');
        localStorage.setItem(
            'status_response',
            'Thank you for withdrawing! Please contact us if you have any questions or concerns.'
        );
        axiosInstance
            .post(`accounts/${from_curr_acc}/withdraw/`, {
                amount: localStorage.getItem('amount'),
                location: 'Online',
                memo: `Withdraw from ${from_curr_acc}` 
            })
            .catch((error) => {
                console.log(error.response.status);
                localStorage.setItem('alert_type', 'alert alert-danger');
                localStorage.setItem(
                    'status_response',
                    'ERROR: This was not a valid withdraw. Please try again.'
                );
            });
      }

    render() {
        if (localStorage.getItem('email') == 'dlb.admin@dlb.com') {
            return <Redirect to="managerdashboard" />;
        }

        return (
            <div className="WithdrawConfirm">
                <UserNavigationBar active={3} />
                <div className="withdraw-confirm">
                    <div className="withdraw-headerDiv">Confirm Withdraw</div>
                    <div className="details-withdraw-confirm">
                        Please confirm your details before submitting.
                    </div>
                </div>
                <div className="withdraw-confirm">
                    <h4>Withdraw Money From: {this.state.from_acct}</h4>
                    <h4>Amount: ${this.state.amount}</h4>
                </div>
                <div className="buttons-withdraw-confirm">
                    <Link
                        to={{
                            pathname: '/withdraw',
                            from_acct: this.state.from_acct,
                            amount: this.state.amount,
                        }}
                    >
                        <button
                            type="button"
                            class="btn btn-danger"
                            id="withdraw-btn"
                        >
                            Cancel withdraw
                        </button>
                    </Link>
                    <Link
                        to={{
                            pathname: '/withdrawtransaction',
                            from_acct: this.state.from_acct,
                            amount: this.state.amount,
                        }}
                    >
                        <button
                            type="submit"
                            class="btn btn-primary"
                            id="withdraw-internal-btn2"
                            onClick={this.check}
                        >
                            Submit
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default WithdrawConfirm;
