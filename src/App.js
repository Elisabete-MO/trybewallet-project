import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// import CarregandoLogin from './pages/CarregandoLogin';
// import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/carteira" component={ Wallet } />
          <Route exact path="/" component={ Login } />
          {/* <Route path="/carregandoLogin" component={ CarregandoLogin } /> */}
          {/* <Route path="*" component={ NotFound } /> */}
        </Switch>
      </main>
    );
  }
}

export default App;
