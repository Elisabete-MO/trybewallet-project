import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Teste a página <WalletForm.js />', () => {
  const inputDataMethod = 'Cartão de débito';
  const inputDataDescription = 'Vencimento dia 11';
  const inputDataTag = 'Alimentação';
  const inputDataCurrency = 'currency-input';

  test('se existem os componentes do WalletForm', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    const inputValueText = screen.getByLabelText('Valor:');
    expect(inputValueText).toBeInTheDocument();

    const inputCurrency = screen.getByTestId(inputDataCurrency);
    expect(inputCurrency).toBeInTheDocument();
    const inputCurrencyText = screen.getByLabelText('Moeda:');
    expect(inputCurrencyText).toBeInTheDocument();

    const inputPayment = screen.getByTestId('method-input');
    expect(inputPayment).toBeInTheDocument();
    const inputPaymentText = screen.getByLabelText('Método de Pagamento:');
    expect(inputPaymentText).toBeInTheDocument();
    expect(screen.getByText(inputDataMethod)).toBeInTheDocument();
    expect(screen.getByText('Cartão de crédito')).toBeInTheDocument();
    expect(screen.getByText('Dinheiro')).toBeInTheDocument();

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();
    const inputTagText = screen.getByLabelText('Categoria:');
    expect(inputTagText).toBeInTheDocument();
    expect(screen.getByText(inputDataTag)).toBeInTheDocument();
    expect(screen.getByText('Lazer')).toBeInTheDocument();
    expect(screen.getByText('Trabalho')).toBeInTheDocument();
    expect(screen.getByText('Transporte')).toBeInTheDocument();
    expect(screen.getByText('Saúde')).toBeInTheDocument();

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();
    const inputDescriptionText = screen.getByLabelText('Descrição:');
    expect(inputDescriptionText).toBeInTheDocument();

    const inputBtn = screen.getByRole('button');
    expect(inputBtn).toBeInTheDocument();
    expect(inputBtn).toHaveAttribute('type', 'button');
    expect(inputBtn.innerHTML).toBe('Adicionar despesa');
  });

  // test('se o componente "Moeda" renderiza corretamente as moedas', async () => {
  //   const currencies = (Object.keys(mockData));
  //   const list = (await screen.findAllByTestId('currency'));
  //   console.log(list[0]);
  // });

  test('se é possivel apagar um registro', async () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: { wallet: { expenses: [{
        id: 0,
        value: '11',
        currency: 'USD',
        method: inputDataMethod,
        tag: inputDataTag,
        description: inputDataDescription,
        exchangeRates: mockData,
      }] } } },
    );
    const inputValue = screen.getByTestId('value-input');
    userEvent.type(inputValue, '11');

    const inputCurrency = screen.getByTestId('currency-input');
    userEvent.click(inputCurrency, 'USD');

    const inputPayment = screen.getByTestId('method-input');
    userEvent.click(inputPayment, inputDataMethod);

    const inputTag = screen.getByTestId('tag-input');
    userEvent.click(inputTag, 'Alimentação');

    const inputDescription = screen.getByTestId('description-input');
    userEvent.type(inputDescription, inputDataDescription);

    const inputBtn = screen.getByText('Adicionar despesa');
    userEvent.click(inputBtn);

    const deleteBtn = await screen.findAllByTestId('delete-btn');
    userEvent.click(deleteBtn[0]);
    expect(deleteBtn[0]).not.toBeInTheDocument();

    const estadoGlobal = store.getState();
    expect(estadoGlobal).toStrictEqual({ user: { email: '' }, wallet: { expenses: [] } });
  });
});
