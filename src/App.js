import React from 'react';
import './App.css';
import Home from './pages/Home'
import Salao from './pages/Salao'
import Cozinha from './pages/Cozinha'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Home} />
          <Route path="/salao" component={Salao} />
          <Route path="/cozinha" component={Cozinha} />
        </header>
      </div>
    </Router>
  );
}

export default App;
