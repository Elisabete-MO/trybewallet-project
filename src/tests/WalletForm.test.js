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

  test('se existem os componentes do WalletForm', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    const inputValueText = screen.getByLabelText('Valor:');
    expect(inputValueText).toBeInTheDocument();

    const inputCurrency = screen.getByTestId('currency-input');
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

  test('Testa se ao clicar no botão "Adicionar despesa" as informações da despesa são salvas no estado global', () => {
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
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputValue, 11);

    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();
    userEvent.click(inputCurrency, 'USD');

    const inputPayment = screen.getByTestId('method-input');
    expect(inputPayment).toBeInTheDocument();
    userEvent.click(inputPayment, inputDataMethod);

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();
    userEvent.click(inputTag, inputDataTag);

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();
    userEvent.type(inputDescription, inputDataDescription);

    const inputBtn = document.getElementsByClassName('btnSave');
    userEvent.click(inputBtn[0]);

    const estadoGlobal = store.getState();
    const { wallet: { expenses: [{ id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates }] } } = estadoGlobal;

    expect(id).toBe(0);
    expect(value).toBe('11');
    expect(currency).toBe('USD');
    expect(method).toBe(inputDataMethod);
    expect(tag).toBe(inputDataTag);
    expect(description).toBe(inputDataDescription);
    expect(exchangeRates).toBe(mockData);
  });

  test('se é possivel modificar o valor dos componentes do WalletForm', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const valueInput = screen.getByTestId(inputValue);
    const descriptionInput = screen.getByTestId(inputDesc);
    const submit = screen.getByRole('button');

    userEvent.type(valueInput, '106.86');
    userEvent.type(descriptionInput, 'Restaurante');
    userEvent.click(submit);

    const description = await screen.findByText('Restaurante');
    const value = await screen.findByText('106.86');
    expect(description).toBeInTheDocument();
    expect(value).toBeInTheDocument();

    const deleteBtn = await screen.findAllByTestId('delete-btn');
    userEvent.click(deleteBtn[0]);
  });
});
