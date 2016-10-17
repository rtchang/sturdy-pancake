import React from 'react';
import MoneySent from "./MoneySent";

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

const validateEmail = function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export default class SendMoney extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      validEmail: null,
      amount: "0.00",
      currency: "USD",
      message: "",
      paymentFor: null,
      sent: false
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.amountBlur = this.amountBlur.bind(this);
    this.amountFocus = this.amountFocus.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.sentMoney = this.sentMoney.bind(this);
  }

  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({validEmail: validateEmail(email)});
    this.setState({email});
  }

  handleAmountChange(e) {
    this.setState({amount: e.target.value});
  }

  handleCurrencyChange(e) {
    this.setState({currency: e.target.value});
  }

  amountBlur() {
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

  handleMessageChange(e) {
    this.setState({message: e.target.value});
  }

  clearForm() {
    this.setState({
      email: "",
      validEmail: null,
      amount: "0.00",
      currency: "USD",
      message: "",
      paymentFor: null,
      sent: false
    });
  }

  sentMoney() {
    let error = "";
    if (!this.state.validEmail) {
      error += "Email must be valid!\n";
    }
    if (this.state.amount === "0.00") {
      error += "You can't send nothing!\n";
    }
    if (this.state.paymentFor === null) {
      error += "You must select a payment type!\n";
    }
    if (error) {
      alert(error);
      return;
    }
    document.body.classList.add("loading");
    setTimeout( () => this.setState({sent: true}), 500);
  }

  render() {
    if (this.state.sent) {
      document.body.classList.remove("loading");
      return <MoneySent
        amount={CURRENCY_SYMBOLS[this.state.currency] + this.state.amount}
        email={this.state.email}
        currency={this.state.currency}
        clearForm={this.clearForm}
      />;
    }
    const currencyOptions = CURRENCY_TYPES.map( currency => {
      return <option key={currency} value = {currency}>{currency}</option>;
    });
    const familyFriends = this.state.paymentFor === FAMILY_FRIENDS;
    const goodsServices = this.state.paymentFor === GOODS_SERVICES;

    return (
      <div>
        <header>Send Money</header>

        <div>
          <p>To:</p>
          <input onChange={this.handleEmailChange} value={this.state.email}/>
          <p>{this.state.validEmail ? "valid" : "invalid"}</p>
        </div>

        <div>
          <p>Amount: {CURRENCY_SYMBOLS[this.state.currency]}</p>
          <input
            type="text"
            onChange={this.handleAmountChange}
            onBlur={this.amountBlur}
            onFocus={this.amountFocus}
            value={this.state.amount}
          />

          <select value={this.state.currency} onChange={this.handleCurrencyChange} >
            {currencyOptions}
          </select>
        </div>

        <div>
          <p>Message (optional):</p>
          <textarea value={this.state.message} onChange={this.handleMessageChange}>
          </textarea>
        </div>

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
        <footer>
          <button onClick={this.clearForm}>Clear</button>
          <button onClick={this.sentMoney}>Next</button>
        </footer>
      </div>
    );
  }
}
