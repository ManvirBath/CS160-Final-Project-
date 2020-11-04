import React from "react";
import "./DepositCheck.css";
import { Link } from "react-router-dom";
import UserNavigationBar from "../UserNavBar/UserNavBar";
import axiosInstance from "../../axios";

class DepositCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to_account: "",
      amount: "",
      memo: "",
      check_image: "",
      file: null,
      errorAmount: "",
      errorMemo: "",
      errorAccount: "",
      errorCheck: "",
      accts: [],
    };
    this.to_account = this.to_account.bind(this);
    this.amount = this.amount.bind(this);
    this.memo = this.memo.bind(this);
    this.check_image = this.check_image.bind(this);
    this.file = this.check_image.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axiosInstance.get("/accounts/").then((res) => {
      const d = res.data;
      this.setState({ accts: d });
    });
  }

  to_account(e) {
    this.setState({ to_account: e.target.selectedOptions[0].text });
    this.setState({ errorAccount: "" });
  }
  amount(e) {
    this.setState({ amount: parseFloat(e.target.value).toFixed(2) });
    this.setState({ errorAmount: "" });
  }
  memo(e) {
    this.setState({ memo: e.target.value });
    this.setState({ errorMemo: "" });
  }
  check_image(e) {
    this.setState({
      check_image: e.target.value,
      file: URL.createObjectURL(e.target.files[0]),
    });
    this.setState({ errorCheck: "" });
  }

  handleSubmit(e) {
    //validates check
    if (this.state.file == null) {
      e.preventDefault();
      this.setState({ errorCheck: "Please upload a check!" });
    }
    //validates to account
    if (this.state.to_account === "") {
      e.preventDefault();
      this.setState({
        errorAccount: "Please select an account to deposit the check to!",
      });
    }
    if (this.state.amount <= 0) {
      e.preventDefault();
      this.setState({ errorAmount: "Amount must be greater than 0.00!" });
    } else if (this.state.amount > 1000000) {
      e.preventDefault();
      this.setState({ errorAmount: "Amount must be less than 1,000,000" });
    }

    if (this.state.memo.length >= 50) {
      this.setState({ errorMemo: "Memo must be less than 50 characters long" });
    }
    if (this.state.memo.match(/^[A-Za-z0-9]*$/gm) == null) {
      this.setState({ errorMemo: "Memo can only contain letters and numbers" });
    }
  }
  render() {
    let userAccts = this.state.accts.map((v) => (
      <option value={v.account_num}>
        {v.account_type} {v.account_num}: {v.balance}
      </option>
    ));
    return (
      <div className="DepositCheck">
        <UserNavigationBar />
        <h1 className="PageHeader"></h1>
        <div id="deposit-header">Deposit Check </div>
        <div className="leftHalf">
          <h2 id="deposit-to">Deposit To</h2>
          <select
            className="accounts"
            id="accounts"
            class="btn btn-light dropdown-toggle"
            onChange={this.to_account}
          >
            <option value="acctNumTo" disabled selected>
              Deposit Money To
            </option>
            {userAccts}
          </select>
          <h6 className="error">{this.state.errorAccount}</h6>
          <h2 id="deposit-amount">
            Amount<h6>(less than $1,000,000)</h6>
          </h2>
          <input
            type="number"
            className="amountInput"
            id="amount-input"
            min="0"
            step="0.01"
            placeholder="$"
            onChange={this.amount}
            class="form-control"
          ></input>
          <h6 className="error">{this.state.errorAmount}</h6>
          <h2 id="deposit-memo">
            Memo(optional)<h6>Max: 50 characters</h6>
          </h2>
          <textarea
            type="text"
            className="memoInput"
            id="memo-input"
            placeholder="Memo"
            class="form-control"
            onChange={this.memo}
          />
          <h6 className="error">{this.state.errorMemo}</h6>
        </div>
        <div className="rightHalf">
          <h4 id="upload-check">Upload Check:</h4>
          <input
            type="file"
            id="img"
            className="checkImgPath"
            accept="image/*"
            onChange={this.check_image}
            class="btn btn-secondary"
          />
          <h6 className="error">{this.state.errorCheck}</h6>
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
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default DepositCheck;
