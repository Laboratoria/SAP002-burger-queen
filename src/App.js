import React from 'react';
import './App.css';
import SignInAndCreateUser from './components/SignInAndCreateUser';
import Saloon from './components/Saloon';
import Kitchen from './components/Kitchen';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import RedirectTo from './components/RedirectTo';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={SignInAndCreateUser} />
          <Route path="/saloon/:id" component={Saloon} />
          {/* <Route path="/saloon" component={RedirectTo} /> */}
          <Route path="/kitchen" component={Kitchen} />
        </header>
      </div>
    </Router>
  );
}

export default App;
