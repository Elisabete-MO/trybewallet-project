import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableContent from './TableContent';
import '../styles/table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="box_table">
        <thead>
          <tr>
            <th id="thDescription">Descrição</th>
            <th id="thTag">Tag</th>
            <th id="thMethod">Método de Pagamento</th>
            <th id="thValue">Valor</th>
            <th id="thCurrency">Moeda</th>
            <th id="thRate">Câmbio utilizado</th>
            <th id="thConverter">Valor convertido</th>
            <th id="thCurrencyConverter">Moeda de conversão</th>
            <th id="thEdit">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (<TableContent
            expense={ expense }
            key={ expense.id }
            // onClickDelete={ this.handleDelete }
          />))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
