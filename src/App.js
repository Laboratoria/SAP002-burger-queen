import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Rodape from './components/Rodape';
import Cabecalho from './components/Cabecalho';
import Home from './components/Home'
import Contatos from './components/Contatos';
import Admin from './cozinha/Admin';
import Login from './cozinha/Login';
import Menu from './components/Menu';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Cabecalho />

          <Route path='/' exact component = {Home} />
          <Route path='/contatos' component = {Contatos} />
          <Route path='/admin' component = {Admin} />
          <Route path='/login' component = {Login} />
          <Route path='/menu' component = {Menu} />
          <Rodape />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;



