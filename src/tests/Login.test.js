import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Teste a página <Login.js />', () => {
  it('Teste se a página contém um heading h1 com o texto TrybeWallet', () => {
    renderWithRouterAndRedux(<App />);
    const loginTitle = screen
      .getByRole('heading', { name: /TrybeWallet/i, level: 1 });
    expect(loginTitle).toBeInTheDocument();
  });

  const dataId = 'email-input';
  const dataPwd = 'password-input';
  const dataBtn = 'login-submit-button';

  test('Teste se a página contém um campo do tipo "email" para inserir o email', () => {
    renderWithRouterAndRedux(<App />);
    const loginEmail = screen.getByTestId(dataId);

    expect(loginEmail).toBeInTheDocument();
    expect(loginEmail).toHaveAttribute('type', 'email');
  });

  test('Teste se a página contém um campo do tipo "password" para inserir a senha', () => {
    renderWithRouterAndRedux(<App />);
    const loginPassword = screen.getByTestId(dataPwd);

    expect(loginPassword).toBeInTheDocument();
    expect(loginPassword).toHaveAttribute('type', 'password');
  });

  test('Passar dados válidos para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const loginEmail = screen.getByTestId(dataId);
    userEvent.type(loginEmail, 'test@mail.com');
    expect(loginEmail).toHaveValue('test@mail.com');

    const loginPassword = screen.getByTestId(dataPwd);
    userEvent.type(loginPassword, '123456');
    expect(loginPassword).toHaveValue('123456');

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).toBeEnabled();
  });

  test('Passar dados inválidos para testar se o botão "Entrar" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const loginEmail = screen.getByTestId(dataId);
    userEvent.type(loginEmail, 'test');
    expect(loginEmail).toHaveValue('test');

    const loginPassword = screen.getByTestId(dataPwd);
    userEvent.type(loginPassword, '12345');
    expect(loginPassword).toHaveValue('12345');

    const loginBtn = screen.getByRole('button');
    expect(loginBtn).not.toBeEnabled();
  });
});
