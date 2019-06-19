import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Salon from './pages/Salon';
import Cozinha from './pages/Cozinha';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/Salon" exact component={Salon} />
          <Route path="/cozinha" exact component={Cozinha} />
        </header>
      </div>
    </Router>
  );
}

export default App;
