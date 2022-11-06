import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/table_content.css';

class TableContent extends Component {
  render() {
    const { expense } = this.props;
    const { currency } = expense;
    return (
      <tr id={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ (parseFloat(expense.value)).toFixed(2) }</td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>{ parseFloat(expense.exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ (expense.value * expense.exchangeRates[currency].ask).toFixed(2) }</td>
        <td>Real</td>
        <td>Edit/Delete</td>
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
    value: PropTypes.number,
    currency: PropTypes.string,
    ask: PropTypes.string,
    exchangeRates: PropTypes.shape([]),
    id: PropTypes.number,
  }).isRequired,
};
// Table.defaultProps = {
//   currencies: [],
// };

export default connect(mapStateToProps)(TableContent);
