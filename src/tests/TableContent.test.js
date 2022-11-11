import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Teste a página <TableContent.js />', () => {
  const tableDataMethod = 'Cartão de débito';
  const tableDataDescription = 'Vencimento dia 11';
  const tableDataTag = 'Alimentação';
  const tableDataCurrency = 'currency-input';

  test('Testa se ao clicar no botão "Adicionar despesa" as informações da despesa são apresentadas corretamente na tela', () => {
    renderWithRouterAndRedux(
      <Wallet />,
      { initialState: { wallet: { expenses: [{
        id: 0,
        value: '11',
        currency: 'USD',
        method: tableDataMethod,
        tag: tableDataTag,
        description: tableDataDescription,
        exchangeRates: mockData,
      }] } } },
    );

    const tableValue = screen.getByTestId('value-input');
    userEvent.type(tableValue, '11');

    const tableCurrency = screen.getByTestId(tableDataCurrency);
    userEvent.click(tableCurrency, 'USD');

    const tablePayment = screen.getByTestId('method-input');
    userEvent.click(tablePayment, tableDataMethod);

    const tableTag = screen.getByTestId('tag-input');
    userEvent.click(tableTag, 'Alimentação');

    const tableDescription = screen.getByTestId('description-input');
    userEvent.type(tableDescription, tableDataDescription);

    const tableBtn = document.getElementsByClassName('btnSave');
    userEvent.click(tableBtn[0]);

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(9);
  });
});
