import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Kitchen from './pages/Kitchen';
import Hall from './pages/Hall';
import Home from './pages/Home';

import './components/Menu.css';
import Signup from './pages/Signup';


class App extends React.Component {

  render() {

    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/salao" component={Hall} />
        <Route path="/cozinha" component={Kitchen} />
        <Route path="/signup" component={Signup} />

      </Router>
    );
  }
}

export default App;
