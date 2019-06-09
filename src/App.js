import React from 'react';
import './App.css';
import Home from "./pages/Home"
import Salon from "./pages/Salon"
import Kitchen from "./pages/Kitchen"
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Route path="/" exact component={Home}/>
        <Route path="/salon" component={Salon}/>
        <Route path="/kitchen" component={Kitchen}/>
      </header>
    </div>
    </Router>
  )
}

export default App;