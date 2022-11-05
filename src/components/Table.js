import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { fetchCurrencies, fetchExpenses } from '../redux/actions';
import '../styles/table.css';

class Table extends Component {
  render() {
    // const { value, currency, method, tag, description, id } = this.state;
    // const { dispatch } = this.props;
    return (
      <table className="box_table">
        <thead>
          <tr>
            <th id="thDescription">Descrição</th>
            <th id="thTag">Tag</th>
            <th id="thMethod">Método de pagamento</th>
            <th id="thValue">Valor</th>
            <th id="thCurrency">Moeda</th>
            <th id="thRate">Câmbio utilizado</th>
            <th id="thConvertion">Valor convertido</th>
            <th id="thCurrencyConvertion">Moeda de conversão</th>
            <th id="thEdit">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>celula</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

// Table.propTypes = {
//   currencies: PropTypes.arrayOf(PropTypes.string),
//   dispatch: PropTypes.func.isRequired,
// };

// Table.defaultProps = {
//   currencies: [],
// };

export default connect(mapStateToProps)(Table);
