import React from 'react';
import { Link } from 'react-router';

const CURRENCY_TYPES = ["USD", "AUD", "GBP", "EUR", "JPY", "CHF"];
const CURRENCY_SYMBOLS = {
  AUD: "$",
  GBP: "£",
  EUR: "€",
  JPY: "¥",
  CHF: "CHF",
  USD: "$"
};
const FAMILY_FRIENDS = 0;
const GOODS_SERVICES = 1;

export default class SendMoney extends React.Component {
  constructor() {
    super();
    this.state = {currency: "USD", paymentFor: null};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({currency: e.target.value});
  }

  render() {
    const currencyOptions = CURRENCY_TYPES.map( currency => {
      return <option key={currency} value = {currency}>{currency}</option>;
    });
    const familyFriends = this.state.paymentFor === FAMILY_FRIENDS;
    const goodsServices = this.state.paymentFor === GOODS_SERVICES;

    return (
      <div>
        <header>Send Money</header>

        <div><p>To:</p><input></input></div>

        <div>
          <p>Amount: {CURRENCY_SYMBOLS[this.state.currency]}</p>
          <input></input>
            <select value={this.state.currency} onChange={this.handleChange} >
              {currencyOptions}
            </select>
          </div>

        <div><p>Message (optional):</p><input></input></div>
        <p>What's this payment for?</p>
        <div>
          <div>
            <p
              onClick={() => this.setState({paymentFor: FAMILY_FRIENDS})}
              className={familyFriends ? "selected" : ""}
            >
              I'm sending money to family and friends
            </p>
            <p className="checkmark">{familyFriends ? "✓" : ""}</p>
          </div>
          <div>
            <p
              onClick={() => this.setState({paymentFor: GOODS_SERVICES})}
              className={goodsServices ? "selected" : ""}
            >
              I'm paying for goods or services
            </p>
            <p className="checkmark">{goodsServices ? "✓" : ""}</p>
          </div>
        </div>
        <footer><button>Clear</button><button>Next</button></footer>
      </div>
    );
  }
}
