import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Teste a página <Wallet.js />', () => {
  const walletMethod = 'Cartão de débito';
  const walletDataDescription = 'Vencimento dia 11';
  const walletDataTag = 'Alimentação';

  it('Teste se a página renderiza corretamente o componente "Header"', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletTitle = screen
      .getByRole('heading', { name: /TrybeWallet/i, level: 1 });
    expect(walletTitle).toBeInTheDocument();
    const walletEmail = screen.getByTestId('email-field');
    expect(walletEmail).toBeInTheDocument();
    const walletTotal = screen.getByTestId('total-field');
    expect(walletTotal).toBeInTheDocument();
  });

  it('Teste se a página contém um campo para adicionar o valor da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletValue = screen.getByTestId('value-input');
    expect(walletValue).toBeInTheDocument();
    const walletValueText = screen.getByLabelText('Valor:');
    expect(walletValueText).toBeInTheDocument();
  });

  it('Teste se a página contém um campo para selecionar em qual moeda será registrada a despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletCurrency = screen.getByTestId('currency-input');
    expect(walletCurrency).toBeInTheDocument();
    const walletCurrencyText = screen.getByLabelText('Moeda:');
    expect(walletCurrencyText).toBeInTheDocument();
  });

  it('Teste se a página contém um campo para selecionar qual método de pagamento será utilizado', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletPayment = screen.getByTestId('method-input');
    expect(walletPayment).toBeInTheDocument();
    const walletPaymentText = screen.getByLabelText('Método de Pagamento:');
    expect(walletPaymentText).toBeInTheDocument();
    expect(screen.getByText(walletMethod)).toBeInTheDocument();
    expect(screen.getByText('Cartão de crédito')).toBeInTheDocument();
    expect(screen.getByText('Dinheiro')).toBeInTheDocument();
  });

  it('Teste se a página contém um Um campo para selecionar uma categoria (tag) para a despesa.', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletTag = screen.getByTestId('tag-input');
    expect(walletTag).toBeInTheDocument();
    const walletTagText = screen.getByLabelText('Categoria:');
    expect(walletTagText).toBeInTheDocument();
    expect(screen.getByText(walletDataTag)).toBeInTheDocument();
    expect(screen.getByText('Lazer')).toBeInTheDocument();
    expect(screen.getByText('Trabalho')).toBeInTheDocument();
    expect(screen.getByText('Transporte')).toBeInTheDocument();
    expect(screen.getByText('Saúde')).toBeInTheDocument();
  });

  it('Teste se a página contém um campo para adicionar a descrição da despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletDescription = screen.getByTestId('description-input');
    expect(walletDescription).toBeInTheDocument();
    const walletDescriptionText = screen.getByLabelText('Descrição:');
    expect(walletDescriptionText).toBeInTheDocument();
  });

  test('Teste se a página contém um botão com título "Adicionar despesa"', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletBtn = screen.getByRole('button');
    expect(walletBtn).toBeInTheDocument();
    expect(walletBtn).toHaveAttribute('type', 'button');
    expect(walletBtn.innerHTML).toBe('Adicionar despesa');
  });

  test('Testa se ao clicar no botão "Adicionar despesa" as informações da despesa são salvas no estado global', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: { wallet: { expenses: {
        id: '0',
        value: 11,
        currency: 'USD',
        method: walletMethod,
        tag: walletDataTag,
        description: walletDataDescription,
        exchangeRates: mockData,
      } } } },
    );

    const walletValue = screen.getByTestId('value-input');
    expect(walletValue).toBeInTheDocument();
    userEvent.type(walletValue, 11);

    const walletCurrency = screen.getByTestId('currency-input');
    expect(walletCurrency).toBeInTheDocument();
    userEvent.click(walletCurrency, 'USD');

    const walletPayment = screen.getByTestId('method-input');
    expect(walletPayment).toBeInTheDocument();
    userEvent.click(walletPayment, walletMethod);

    const walletTag = screen.getByTestId('tag-input');
    expect(walletTag).toBeInTheDocument();
    userEvent.click(walletTag, 'Alimentação');

    const walletDescription = screen.getByTestId('description-input');
    expect(walletDescription).toBeInTheDocument();
    userEvent.type(walletDescription, walletDataDescription);

    const walletBtn = screen.getByRole('button');
    userEvent.click(walletBtn);

    const estadoGlobal = store.getState();
    console.log(estadoGlobal);
    const { wallet: { expenses: { id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates } } } = estadoGlobal;

    expect(id).toBe('0');
    expect(value).toBe(11);
    expect(currency).toBe('USD');
    expect(method).toBe(walletMethod);
    expect(tag).toBe(walletDataTag);
    expect(description).toBe(walletDataDescription);
    expect(exchangeRates).toBe(mockData);
  });
});
