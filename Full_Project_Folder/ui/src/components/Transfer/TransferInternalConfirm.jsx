import React from 'react';
import './Transfer.css';
import { Link } from 'react-router-dom';
import UserNavigationBar from '../UserNavBar/UserNavBar';

class TransferInternalConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                        {this.props.location.from_acct}
                    </h4>
                    <h4>Transfer To: {this.props.location.to_acct}</h4>
                    <h4>Amount: {this.props.location.amount}</h4>
                    <h4>Memo: {this.props.location.memo}</h4>
                </div>
                <div className="buttons-transfer-internal-confirm">
                    <Link to="/transferinternal">
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
                            from_acct: this.props.location.from_acct,
                            to_acct: this.props.location.to_acct,
                            amount: this.props.location.amount,
                            memo: this.props.location.memo,
                        }}
                    >
                        <button
                            type="button"
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
