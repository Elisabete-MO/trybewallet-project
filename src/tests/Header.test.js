import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
import Wallet from '../pages/Wallet';
import Header from '../components/Header';

describe('Teste o componente <Header.js />', () => {
  it('Teste se a página renderiza corretamente o título "TrybeWallet"', () => {
    renderWithRouterAndRedux(<Header />);
    const headerTitle = screen
      .getByRole('heading', { name: /TrybeWallet/i, level: 1 });
    expect(headerTitle).toBeInTheDocument();
  });

  const dataId = 'email-input';
  const dataPwd = 'password-input';
  const dataEmail = 'test@mail.com';
  const walletMethod = 'Cartão de débito';
  const walletDataDescription = 'Vencimento dia 11';
  const walletDataTag = 'Alimentação';
  const walletDataField = 'total-field';

  it('Teste se a página possui um componente que exibe o email do usuário', () => {
    const { store, history } = renderWithRouterAndRedux(
      <App />,
      { initialState: { user: { email: dataEmail } } },
    );

    const loginEmail = screen.getByTestId(dataId);
    userEvent.type(loginEmail, dataEmail);
    expect(loginEmail).toHaveValue(dataEmail);

    const loginPassword = screen.getByTestId(dataPwd);
    userEvent.type(loginPassword, '123456');
    expect(loginPassword).toHaveValue('123456');

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    const estadoGlobal = store.getState();
    const { user: { email } } = estadoGlobal;

    expect(history.location.pathname).toBe('/carteira');

    expect(email).toBe(dataEmail);

    const headerEmail = screen.getByTestId('email-field');
    expect(headerEmail).toBeInTheDocument();
    expect(headerEmail.innerHTML).toBe(`Email: ${dataEmail}`);
  });

  it('Teste se a página possui um componente que exibe corretamente o valor inicial das despesas', () => {
    renderWithRouterAndRedux(<Header />);

    const headerTotal = screen.getByTestId(walletDataField);
    expect(headerTotal).toBeInTheDocument();
    expect(headerTotal.innerHTML).toBe('0.00');

    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency.innerHTML).toBe('BRL');
  });

  it('Teste se a página exibe o valor 0.00 recebendo um valor indefinido', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: { wallet: { expenses: [{
        id: 0,
        value: '',
        currency: 'USD',
        method: walletMethod,
        tag: walletDataTag,
        description: walletDataDescription,
        exchangeRates: mockData,
      }] } } },
    );

    const walletValue = screen.getByTestId('value-input');
    userEvent.type(walletValue);

    const walletCurrency = screen.getByTestId('currency-input');
    userEvent.click(walletCurrency, 'USD');

    const walletPayment = screen.getByTestId('method-input');
    userEvent.click(walletPayment, walletMethod);

    const walletTag = screen.getByTestId('tag-input');
    userEvent.click(walletTag, walletDataTag);

    const walletDescription = screen.getByTestId('description-input');
    userEvent.type(walletDescription, walletDataDescription);

    const walletBtn = document.getElementsByClassName('btnSave');
    userEvent.click(walletBtn[0]);

    const forEach = (store, jest.fn().mockReturnValue(' '));
    forEach();
    expect(forEach).toHaveBeenCalled();
    const headerTotal = screen.getByTestId(walletDataField);
    expect(headerTotal).toBeInTheDocument();
    expect(headerTotal.innerHTML).toBe('0.00');
  });

  it('Teste se a página possui um componente que exibe corretamente o valor total das despesas', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: { wallet: { expenses: [{
        id: 0,
        value: '11',
        currency: 'USD',
        method: walletMethod,
        tag: walletDataTag,
        description: walletDataDescription,
        exchangeRates: mockData,
      }] } } },
    );

    const walletValue = screen.getByTestId(walletDataField);
    expect(walletValue).toBeInTheDocument();
    userEvent.type(walletValue, '11');

    const walletCurrency = screen.getByTestId('currency-input');
    expect(walletCurrency).toBeInTheDocument();
    userEvent.click(walletCurrency, 'USD');

    const walletPayment = screen.getByTestId('method-input');
    expect(walletPayment).toBeInTheDocument();
    userEvent.click(walletPayment, walletMethod);

    const walletTag = screen.getByTestId('tag-input');
    expect(walletTag).toBeInTheDocument();
    userEvent.click(walletTag, walletDataTag);

    const walletDescription = screen.getByTestId('description-input');
    expect(walletDescription).toBeInTheDocument();
    userEvent.type(walletDescription, walletDataDescription);

    const walletBtn = document.getElementsByClassName('btnSave');
    userEvent.click(walletBtn[0]);

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
    expect(method).toBe(walletMethod);
    expect(tag).toBe(walletDataTag);
    expect(description).toBe(walletDataDescription);
    expect(exchangeRates).toBe(mockData);
    expect(exchangeRates[currency].ask).toBe('4.7531');

    totalSum = jest.fn().mockReturnValue('52,28');
    totalSum();
    expect(totalSum).toHaveBeenCalled();
    const headerTotal = screen.getByTestId(walletDataField);
    expect(headerTotal).toBeInTheDocument();
    expect(headerTotal.innerHTML).toBe('52.28');
  });
});
