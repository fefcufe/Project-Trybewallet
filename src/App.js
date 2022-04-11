import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <nav id="nav-bar" />
      <div className="app-container">
        <h1 id="hello"> Hello, TrybeWallet! </h1>
        <img
          src="https://thumbs.dreamstime.com/b/carteira-com-o-%C3%ADcone-do-dinheiro-no-estilo-dos-desenhos-animados-isolado-no-fundo-branco-84211643.jpg"
          alt="carteira"
          id="imagem-carteira"
        />
      </div>

      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
