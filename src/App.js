import React from 'react';
import './App.css';
import home from './pages/home'
import saloon from './pages/saloon'
import kitchen from './pages/kitchen'
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import firebase from "./firebaseConfig";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={home}/>
          <Route path="/saloon" component={saloon}/>
          <Route path="/kitchen" component={kitchen}/>
        </header>
      </div>
    </Router>
    );
  }
}

export default App;
