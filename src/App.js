import React from 'react';
import './App.css';
import SignInAndCreateUser from './components/SignInAndCreateUser';
import Saloon from './components/Saloon';
import Kitchen from './components/Kitchen';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={SignInAndCreateUser} />
          <Route path="/salao" component={Saloon} />
          <Route path="/cozinha" component={Kitchen} />
        </header>
      </div>
    </Router>
  );
}

export default App;
