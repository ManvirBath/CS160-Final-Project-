import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class TransferInternalConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            to_acct:
                this.props.location.to_acct || localStorage.getItem('to_acct'),
            from_acct:
                this.props.location.from_acct ||
                localStorage.getItem('from_acct'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
            memo: this.props.location.memo || localStorage.getItem('memo'),
        };
        this.check = this.check.bind(this);
    }

    async componentDidMount() {
        console.log(localStorage.getItem('to_acct'));
        console.log(localStorage.getItem('from_acct'));
        console.log(localStorage.getItem('amount'));
        console.log(localStorage.getItem('memo'));
        localStorage.setItem(
            'status_response',
            'Thank you for your transfer request! Please contact us if you have any questions or concerns.'
        );
        localStorage.setItem('alert_type', 'alert alert-success');
        const from_cur_acc = await localStorage.getItem('from_acct');

        const response = await axiosInstance
            .post(`accounts/${from_cur_acc}/transfer_internal/`, {
                to_account_number: localStorage.getItem('to_acct'),
                amount: localStorage.getItem('amount'),
                location: 'Online',
                memo: localStorage.getItem('memo'),
            })
            .catch((error) => {
                console.log(error.response.status);
                this.state.error_stat = error.response.status;
                localStorage.setItem('alert_type', 'alert alert-danger');
                localStorage.setItem(
                    'status_response',
                    'ERROR: This was not a valid transaction. Please try again.'
                );
                //this.setState({ alert_type: 'alert alert-danger' });
                // console.log('hello' + this.state.alert_type);
                // this.setState({
                //     alert_type: 'alert alert-danger',
                //     status_response:
                //         'ERROR: This was not a valid transaction. Please try again.',
                // });
                // console.log('hello' + this.state.alert_type);
            });
    }

    render() {
        return (
            <div className="DepositCheckConfirm">
                <UserNavigationBar active={2} />
                <div className="transfer-internal-confirm">
                    <div className="transfer-internal-headerDiv">
                        Confirm transfer
                    </div>
                    <div id="transfer-internal-greeting2">
                        Please confirm your details before submitting.
                    </div>
                </div>
                <div className="transfer-internal-confirm">
                    <h4>
                        Transfer From:
                        {this.state.from_acct}
                    </h4>
                    <h4>Transfer To: {this.state.to_acct}</h4>
                    <h4>Amount: {this.state.amount}</h4>
                    <h4>Memo: {this.state.memo}</h4>
                </div>
                <div className="buttons-transfer-internal-confirm">
                    <Link
                        to={{
                            pathname: '/transferinternal',
                            to_acct: this.state.to_acct,
                            from_acct: this.state.from_acct.value,
                            amount: this.state.amount,
                            memo: this.state.memo,
                        }}
                    >
                        <button
                            type="button"
                            class="btn btn-danger"
                            id="transfer-internal-btn"
                        >
                            Don't make transfer
                        </button>
                    </Link>
                    <Link
                        to={{
                            pathname: '/transferinternaltransaction',
                            from_acct: this.state.from_acct,
                            to_acct: this.state.to_acct,
                            amount: this.state.amount,
                            memo: this.state.memo,
                        }}
                    >
                        <button
                            type="submit"
                            class="btn btn-primary"
                            id="transfer-internal-btn2"
                        >
                            Submit
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default TransferInternalConfirm;
