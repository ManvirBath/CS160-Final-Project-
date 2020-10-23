import React from "react";
import "./DepositCheck.css";
import { Link } from "react-router-dom";

class DepositCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to_account: "",
      amount: "",
      memo: "",
      check_image: "",
      file: null,
    };
    this.to_account = this.to_account.bind(this);
    this.amount = this.amount.bind(this);
    this.memo = this.memo.bind(this);
    this.check_image = this.check_image.bind(this);
    this.file = this.check_image.bind(this);
  }

  to_account(e) {
    this.setState({ to_account: e.target.value });
    console.log(e.target.value);
  }
  amount(e) {
    this.setState({ amount: e.target.value });
  }
  memo(e) {
    this.setState({ memo: e.target.value });
  }
  check_image(e) {
    this.setState({
      check_image: e.target.value,
      file: URL.createObjectURL(e.target.files[0]),
    });
  }

  render() {
    return (
      <div className="DepositCheck">
        <h1 className="PageHeader" class="jumbotron">
          Deposit check to account
        </h1>
        <div className="leftHalf">
          <h2>To:</h2>
          <select
            className="accounts"
            id="accounts"
            class="btn btn-light dropdown-toggle"
            onChange={this.deposit_to_account}
          >
            <option value="acctNum" disabled selected>
              Deposit Money To
            </option>
            <option value="Account1">Savings Account 123</option>
            <option value="Account2">Savings Account 345</option>
            <option value="Account3">Checking Account 678</option>
          </select>

          <h2>Amount</h2>
          <input
            type="text"
            className="amountInput"
            placeholder="$"
            onChange={this.amount}
            class="form-control"
          ></input>

          <h2>Memo(optional)</h2>
          <textarea
            type="text"
            className="memoInput"
            placeholder="Memo"
            class="form-control"
            onChange={this.memo}
          />
        </div>
        <div className="rightHalf">
          <h4>Upload Check:</h4>
          <input
            type="file"
            id="img"
            className="checkImgPath"
            accept="image/*"
            onChange={this.check_image}
            class="btn btn-secondary"
          />
          <img className="checkImg" src={this.state.file} />
          <Link
            to={{
              pathname: "/depositcheckconfirm",
              account: this.state.to_account,
              amount: this.state.amount,
              memo: this.state.memo,
              file: this.state.file,
              check_image: this.state.check_image,
            }}
          >
            <button type="button" class="btn btn-primary">
              Next
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default DepositCheck;
