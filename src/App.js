import React from 'react';
import './App.css';
import Home from './pages/Home'
import Hall from './pages/Hall'
import Kitchen from './pages/Kitchen'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="title">Burger Queen</h1>
          <FontAwesomeIcon className="icon" icon={faCrown} size="2x" />
          <Route path="/" exact component={Home} />
          <Route path="/Hall" component={Hall} />
          <Route path="/Kitchen" component={Kitchen} />
        </header>
      </div>
    </Router>
  );
}

export default App;
