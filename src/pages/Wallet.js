import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addEmailAction } from '../redux/actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../styles/wallet.css';

class Wallet extends Component {
  render() {
    return (
      <div className="container_wallet">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
