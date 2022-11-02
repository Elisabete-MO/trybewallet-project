import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/header.css';

class Header extends Component {
  state = {
    total: 0,
  };

  render() {
    const { total } = this.state;
    const { email } = this.props;
    return (
      <header className="box_header">
        <h1 className="h1_header">TrybeWallet</h1>
        <h3 className="email_header" data-testid="email-field">{`Email: ${email}`}</h3>
        <div className="total_curr_div">
          <h3
            className="total_header"
            data-testid="total-field"
          >
            {`Despesa Total: ${total}`}
          </h3>
          <h3 className="currency_header" data-testid="header-currency-field">BRL</h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
};

Header.defaultProps = {
  email: 'alguem@alguem.com',
};

export default connect(mapStateToProps)(Header);
