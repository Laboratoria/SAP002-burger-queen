import React from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Salon from './pages/Salon';
import Kitchen from './pages/Kitchen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/salon' exact component={Salon} />
          <Route path='/kitchen' exact component={Kitchen} />
        </header>
      </div>
    </Router>
  );
}

export default App;
