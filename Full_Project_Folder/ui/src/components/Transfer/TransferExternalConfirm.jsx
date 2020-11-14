import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';
import axiosInstance from '../../axios';

class TransferExternalConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status_response:
                'Thank you for your transfer request! Please contact us if you have any questions or concerns.',
            alert_type: 'alert alert-success',
            to_acct:
                this.props.location.to_acct || localStorage.getItem('to_acct'),
            from_acct:
                this.props.location.from_acct ||
                localStorage.getItem('from_acct'),
            routing_num:
                this.props.location.routing_num ||
                localStorage.getItem('routing_num'),
            amount:
                this.props.location.amount || localStorage.getItem('amount'),
            memo: this.props.location.memo || localStorage.getItem('memo'),
        };
    }
    async componentDidMount() {
        // console.log(localStorage.getItem('to_acct'))
        // console.log(localStorage.getItem('from_acct'))
        // console.log(localStorage.getItem('routing_num'))
        // console.log(localStorage.getItem('amount'))
        // console.log(localStorage.getItem('memo'))
        localStorage.setItem(
            'status_response',
            'Thank you for your transfer request! Please contact us if you have any questions or concerns.'
        );
        localStorage.setItem('alert_type', 'alert alert-success');

        const from_cur_acc = await localStorage.getItem('from_acct');
        const cur_rout_num = await localStorage.getItem('routing_num');
        if (parseInt(cur_rout_num) == parseInt('123456789')) {
            const res1 = await axiosInstance
                .post(`accounts/${from_cur_acc}/transfer_internal/`, {
                    to_account_number: localStorage.getItem('to_acct'),
                    amount: localStorage.getItem('amount'),
                    location: 'Online',
                    memo: localStorage.getItem('memo'),
                })
                .catch((error) => {
                    console.log(error.response.status);
                    localStorage.setItem('alert_type', 'alert alert-danger');
                    localStorage.setItem(
                        'status_response',
                        'ERROR: This was not a valid transaction. Please try again.'
                    );
                });
        } else {
            const res2 = await axiosInstance
                .post(`accounts/${from_cur_acc}/transfer_external/`, {
                    amount: localStorage.getItem('amount'),
                    location: 'Online',
                    routing_num: localStorage.getItem('routing_num'),
                    to_account_num: localStorage.getItem('to_acct'),
                    memo: localStorage.getItem('memo'),
                })
                .catch((error) => {
                    console.log(error.response.status);
                    localStorage.setItem('alert_type', 'alert alert-danger');
                    localStorage.setItem(
                        'status_response',
                        'ERROR: This was not a valid transaction. Please try again.'
                    );
                });
        }
    }

    // async check(e) {
    //     const from_cur_acc = await localStorage.getItem('from_acct');
    //     const cur_rout_num = await localStorage.getItem('routing_num')
    //     if (parseInt(cur_rout_num) == parseInt("123456789")) {
    //         const res1 = await axiosInstance
    //           .post(`accounts/${from_cur_acc}/transfer_internal/`, {
    //             to_account_number: localStorage.getItem('to_acct'),
    //             amount: localStorage.getItem('amount'),
    //             location: "Online",
    //             memo: localStorage.getItem('memo'),
    //           })
    //           .catch((error) => {
    //             console.log(error.response.status);
    //             this.setState({ alert_type: "alert alert-danger" });
    //             this.setState({
    //               status_response:
    //                 "ERROR: This was not a valid transaction. Please try again.",
    //             });
    //           });
    //       } else {
    //         const res2 = await axiosInstance
    //           .post(`accounts/${from_cur_acc}/transfer_external/`, {
    //             amount: localStorage.getItem('amount'),
    //             location: "Online",
    //             routing_num: localStorage.getItem('routing_num'),
    //             to_account_num: localStorage.getItem('to_acct'),
    //             memo: localStorage.getItem('memo'),
    //           })
    //           .catch((error) => {
    //             console.log(error.response.status);
    //             this.setState({ alert_type: "alert alert-danger" });
    //             this.setState({
    //               status_response:
    //                 "ERROR: This was not a valid transaction. Please try again.",
    //             });
    //           });
    //       }

    // }

    render() {
        return (
            <div className="DepositCheckConfirm">
                <UserNavigationBar active={2} />
                <div className="transfer-external-confirm">
                    <div className="transfer-external-headerDiv">
                        Confirm transfer
                    </div>
                    <div id="transfer-external-greeting1">
                        Please confirm your details before submitting.
                    </div>
                    <div className="details-external-confirm">
                        <h4>
                            Transfer From:
                            {this.state.from_acct}
                        </h4>
                        <h4>Transfer To: {this.state.to_acct}</h4>
                        <h4>Routing number: {this.state.routing_num}</h4>
                        <h4>Amount: {this.state.amount}</h4>
                        <h4>Memo: {this.state.memo}</h4>
                    </div>
                    <div className="buttons-transfer-external-confirm">
                        <Link to="/transferexternal">
                            <button
                                type="button"
                                class="btn btn-danger"
                                id="transfer-external-btn"
                            >
                                Don't make transfer
                            </button>
                        </Link>
                        <Link
                            to={{
                                pathname: '/transferexternaltransaction',
                                from_acct: this.state.from_acct,
                                to_acct: this.state.to_acct,
                                amount: this.state.amount,
                                memo: this.state.memo,
                                routing_num: this.state.routing_num,
                            }}
                        >
                            <button
                                type="button"
                                class="btn btn-primary"
                                id="transfer-external-btn2"
                            >
                                Submit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransferExternalConfirm;
