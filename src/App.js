import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import Login from './pages/Login'
import Order from './pages/Order'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

  render() {
    return (
      <Router>
      <div className="App">
        <Route path="/" exact component={Login} />
        <Route path="/order" exact component={Order} />
      </div>
      </Router>
    );
  }
}

export default App;
