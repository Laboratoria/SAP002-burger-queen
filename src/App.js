import React from 'react';
import './App.css';
import Home from './pages/Home'
import Salao from './pages/Salao'
import Cozinha from './pages/Cozinha'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Burger Queen</h1>
          <FontAwesomeIcon className="icon" icon={faCrown} size="4x" />
          <Route path="/" exact component={Home} />
          <Route path="/Salao" component={Salao} />
          <Route path="/Cozinha" component={Cozinha} />
        </header>
      </div>
    </Router>
  );
}

export default App;
