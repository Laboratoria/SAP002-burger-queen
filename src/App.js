import React from 'react';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Saloon from './pages/Saloon'
import Breakfast from './components/Breakfast'
import Allday from './components/Allday'
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
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/saloon" component={Saloon} />
        <Route path="/breakfast" component={Breakfast} />
        <Route path="/allday" component={Allday} />
        <Route path="/kitchen" component={Kitchen} />
      </div>
      </Router>
    );
  }
}

export default App;
