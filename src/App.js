import React from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import Saloon from './pages/Saloon'
import Kitchen from './pages/Kitchen'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


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
        <Route path="/register" exact component={Register} />
        <Route path="/saloon" exact component={Saloon} />
        <Route path="/kitchen" exact component={Kitchen} />
      </div>
      </Router>
    );
  }
}

export default App;
