import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Salao from './Pages/Salao';
import Cadastro from './Pages/Cadastro';
import { BrowserRouter as Router, Route, Redirect } from
  'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Home} />
          <Route path="/salao" component={Salao} />
          <Route path="/Cadastro" component={Cadastro} />
        </header>
      </div>
    </Router>
  );
}


export default App;
