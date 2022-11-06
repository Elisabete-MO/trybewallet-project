import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/header.css';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;
    console.log(expenses);
    let sumExpense = 0;
    let valueRate = 0;
    expenses.forEach((b) => {
      const { value, currency, exchangeRates } = b;
      const rate = exchangeRates[currency].ask;
      valueRate = (value * rate);
      sumExpense += valueRate;
    });
    return (sumExpense).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="box_header">
        <h1 className="h1_header">TrybeWallet</h1>
        <h3 className="email_header" data-testid="email-field">{`Email: ${email}`}</h3>
        <div className="total_curr_div">
          <h3
            className="total_header"
            data-testid="total-field"
          >
            Despesa Total:
            { this.totalSum() }
          </h3>
          <h3 className="currency_header" data-testid="header-currency-field">BRL</h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Header.defaultProps = {
  email: 'alguem@alguem.com',
  // base: [{
  //   value: '',
  //   currency: '',
  //   exchangeRates: {},
  // }],
};

export default connect(mapStateToProps)(Header);
