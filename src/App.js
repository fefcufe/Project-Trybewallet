import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <nav id="nav-bar" />
      <h1> Hello, TrybeWallet! </h1>

      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
