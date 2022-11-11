import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';

describe('Teste a página <Table.js />', () => {
  test('se existem os componentes do TableContent', async () => {
    renderWithRouterAndRedux(<Table />);

    const tableDescriptionText = screen.getByText('Descrição');
    expect(tableDescriptionText).toBeInTheDocument();

    const tableTagText = screen.getByText('Tag');
    expect(tableTagText).toBeInTheDocument();

    const tablePaymentText = screen.getByText('Método de Pagamento');
    expect(tablePaymentText).toBeInTheDocument();

    const tableValueText = screen.getByText('Valor');
    expect(tableValueText).toBeInTheDocument();

    const tableCurrencyText = screen.getByText('Moeda');
    expect(tableCurrencyText).toBeInTheDocument();

    const tableRateText = screen.getByText('Câmbio utilizado');
    expect(tableRateText).toBeInTheDocument();

    const tableConverterText = screen.getByText('Valor convertido');
    expect(tableConverterText).toBeInTheDocument();

    const tableCurrencyConverterText = screen.getByText('Moeda de conversão');
    expect(tableCurrencyConverterText).toBeInTheDocument();

    const tableEditText = screen.getByText('Editar/Excluir');
    expect(tableEditText).toBeInTheDocument();
  });
});
