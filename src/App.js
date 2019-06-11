
import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Button from './button.js'
// import Counter from './counter.js'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Home from "./pages/Home";
import Salao from "./pages/Salao";


function App() {
  return(
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/salao" component={Salao} />
        <Route path="/cozinha" component={Cozinha} />
 </Router>
  );
}


function Cozinha() {
  return (
    <div>
      Estamos na cozinha
    </div>

  )

}






export default App;
