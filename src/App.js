import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Salao from './Pages/Salao';
import Cadastro from './Pages/Cadastro';
import Cozinha from './Pages/Cozinha';
import Prontos from './Pages/Prontos';
import { Link } from 'react-router-dom';
import logo from './Images/logo.png';
import { BrowserRouter as Router, Route, Redirect } from
  'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <img src={logo} alt="logo Burguer Queen"/>
          <Route path="/" exact component={Home} />
          <Route path="/salao" exact component={Salao} />
          <Route path="/cozinha" exact component={Cozinha} />
          <Route path="/cadastro" exact component={Cadastro} />
          <Route path="/prontos" exact component={Prontos} />
        </header>
      </div>
    </Router>
  );
}


export default App;
