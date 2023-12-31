import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExpenses } from '../redux/actions';
import '../styles/wallet_form.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Cartão de débito',
    tag: 'Alimentação',
    description: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  clearData = () => {
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Cartão de débito',
      tag: 'Alimentação',
      description: '',
    });
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { dispatch, expenses, currencies } = this.props;
    return (
      <main className="box_form">
        <label htmlFor="inputValue">
          Valor:
          <input
            type="number"
            className="inputValue"
            data-testid="value-input"
            id="inputValue"
            name="value"
            placeholder="0.00"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="selectCurrencies">
          Moeda:
          <select
            aria-label="Moeda"
            className="selectCurrencies"
            data-testid="currency-input"
            id="selectCurrencies"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((acc) => (
              <option key={ acc } data-testid="currency" name={ acc }>
                { acc }
              </option>))}
          </select>
        </label>
        <label htmlFor="selectPayment">
          Método de Pagamento:
          <select
            aria-label="Payment"
            className="selectPayment"
            data-testid="method-input"
            id="selectPayment"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </label>
        <label htmlFor="selectTag">
          Categoria:
          <select
            aria-label="categoria"
            className="selectTag"
            id="selectTag"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="inputDescription">
          Descrição:
          <input
            type="text"
            className="inputDescription"
            data-testid="description-input"
            id="inputDescription"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          className="btnSave"
          onClick={ () => {
            this.setState({ id: (expenses.length + 1) });
            dispatch(fetchExpenses(this.state));
            this.clearData();
          } }
        >
          Adicionar despesa
        </button>
      </main>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(WalletForm);
