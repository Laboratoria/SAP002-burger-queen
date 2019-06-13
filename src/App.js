import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Salao from './pages/Salao';
import Cozinha from './pages/Cozinha';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <Link to="/">Home</Link>|
          <Link to="/signup">Cadastro</Link>|
          <Link to="/salao">Salão</Link>|
          <Link to="/cozinha">Cozinha</Link> */}
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/salao" exact component={Salao} />
          <Route path="/cozinha" exact component={Cozinha} />
        </header>
      </div>
    </Router>
  );
}

export default App;
