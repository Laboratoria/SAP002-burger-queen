import React from 'react';
import './App.css';
import Home from "./pages/Home"
import Saloon from "./pages/Saloon"
import Kitchen from "./pages/Kitchen"
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Route path="/" exact component={Home}/>
        <Route path="/saloon" component={Saloon}/>
        <Route path="/kitchen" component={Kitchen}/>
      </header>
    </div>
    </Router>
  )
}

export default App;