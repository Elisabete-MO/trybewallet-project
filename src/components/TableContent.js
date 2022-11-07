import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/table_content.css';

class TableContent extends Component {
  render() {
    const { expense } = this.props;
    const { currency, value, id, description, tag, method, exchangeRates } = expense;
    return (
      <tr id={ id }>
        { console.log(exchangeRates[currency].ask, exchangeRates[currency].name) }
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>
          {
            (value) === ''
              ? '0.00'
              : parseFloat(value).toFixed(2)
          }
        </td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>
          {
            Number.isNaN(value)
              ? '0.00'
              : (value * exchangeRates[currency].ask).toFixed(2)
          }
        </td>
        <td>Real</td>
        <td><button type="button" data-testid="delete-btn">Excluir</button></td>
      </tr>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

TableContent.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
    currency: PropTypes.string,
    exchangeRates: PropTypes.shape([]),
    id: PropTypes.number,
  }).isRequired,
};
// Table.defaultProps = {
//   currencies: [],
// };

export default connect(mapStateToProps)(TableContent);
