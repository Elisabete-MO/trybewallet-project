import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';
import '../styles/wallet_form.css';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCurrencies());
    const { currencies } = this.props;
    const select = document.querySelector('.selectCurrencies');
    if (currencies.length !== select.options.length) {
      currencies.forEach((element) => {
        const option = new Option(element, element.toLowerCase());
        select.options[select.options.length] = option;
      });
    }
  }

  render() {
    return (
      <main className="box_form">
        <label htmlFor="inputValue">
          Valor:
          <input
            type="number"
            className="inputValue"
            data-testid="value-input"
            name="inputValue"
            placeholder="0.00"
            prefix="$"
            step={ 0.05 }
          // value="0.00"
          // onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="selectCurrencies">
          Moeda:
          <select
            aria-label="Moeda"
            className="selectCurrencies"
            data-testid="currency-input"
            name="selectCurrencies"
          />
        </label>
        <label htmlFor="inputDescription">
          Descrição:
          <input
            type="text"
            className="inputDescription"
            data-testid="description-input"
            name="inputDescription"
          // value="0.00"
          // onChange={ this.handleChange }
          />
        </label>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(WalletForm);
