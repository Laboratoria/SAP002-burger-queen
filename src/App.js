import React from 'react';
import './App.css';
import Home from './components/Home';
import Register from './Pages/Register';
import Salao from './components/Salao';
import Kitchen from './components/Kitchen';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Home} />
          <Route path="/Register" component={Register} />
          <Route path="/Salao" component={Salao} />
          <Route path="/Kitchen" component={Kitchen} />
        </header>
      </div>
    </Router>
  );
}

export default App;