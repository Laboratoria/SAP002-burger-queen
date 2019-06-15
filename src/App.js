import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './pages/Login'
import DinnerHall from './pages/DinnerHall'
import DinnerKitchen from './pages/DinnerKitchen'

// 


function App() {
return(
      <Router>
      
        <Route path="/" exact component={Login}/>
        <Route path="/DinnerHall" component={DinnerHall}/>
        <Route path="/DinnerKitchen"  component={DinnerKitchen}/>
     
      </Router>
    );
  }


export default App;
   