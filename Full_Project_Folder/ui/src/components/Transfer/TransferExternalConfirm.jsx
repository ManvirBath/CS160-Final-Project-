import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class TransferExternalConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

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
                        <h4>Transfer From: {this.props.location.from_acct}</h4>
                        <h4>Transfer To: {this.props.location.to_acct}</h4>
                        <h4>
                            Routing number: {this.props.location.routing_num}
                        </h4>
                        <h4>Amount: {this.props.location.amount}</h4>
                        <h4>Memo: {this.props.location.memo}</h4>
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
                                from_acct: this.props.location.from_acct,
                                to_acct: this.props.location.to_acct,
                                amount: this.props.location.amount,
                                memo: this.props.location.memo,
                                routing_num: this.props.location.routing_num,
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
