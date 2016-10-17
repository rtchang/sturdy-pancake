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

const formatMoney = function(amount, currency) {
  const formatter = new Intl.NumberFormat('en-US', {
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(amount);
};

export default class SendMoney extends React.Component {
  constructor() {
    super();
    this.state = {amount: "0.00", currency: "USD", paymentFor: null};
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.amountBlur = this.amountBlur.bind(this);
    this.amountFocus = this.amountFocus.bind(this);
  }

  handleAmountChange(e) {
    this.setState({amount: e.target.value});
  }

  handleCurrencyChange(e) {
    this.setState({currency: e.target.value});
  }

  amountBlur() {
    console.log("blur");
    const amount = this.state.amount.replace(/\.(?![^.]+$)|[^0-9.]/g, '');
    const formatted = formatMoney(amount,this.state.currency);
    this.setState({amount: formatted});
  }

  amountFocus() {
    let amount = this.state.amount.replace(/\.(?![^.]+$)|[^0-9.]/g, '');
    if (amount.slice(-3) === ".00") {
      amount = amount.slice(0,-3);
    }
    this.setState({amount});
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
          <input
            type="text"
            pattern="\d*"
            onChange={this.handleAmountChange}
            onBlur={this.amountBlur}
            onFocus={this.amountFocus}
            value={this.state.amount}
          />

          <select value={this.state.currency} onChange={this.handleCurrencyChange} >
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
