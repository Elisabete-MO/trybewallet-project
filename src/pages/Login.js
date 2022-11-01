import React, { Component } from 'react';
// import { connect } from 'react-redux';
import '../styles/login.css';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyBtn());
  };

  handleClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/carteira');
  };

  verifyBtn = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const min = '5';
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > min;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  render() {
    const { isBtnDisabled, email, password } = this.state;
    return (
      <div className="container">
        <div className="boxLogin">
          <h1 className="h1login">TrybeWallet</h1>
          <label htmlFor="inputLogin">
            <input
              type="text"
              className="inputLogin"
              data-testid="email-input"
              name="email"
              placeholder="email@email.com"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="inputSenha">
            <input
              type="password"
              className="inputLogin"
              data-testid="password-input"
              name="password"
              value={ password }
              placeholder="**********"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            className="btnLogin"
            data-testid="login-submit-button"
            disabled={ isBtnDisabled }
            onClick={ this.handleClick }
          >
            ENTRAR
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
