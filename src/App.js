import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Login from './pages/Login'
// import Modal from './pages/Modal'


function App() {
return(
      <Router>
      
        <Route path="/" exact component={Login}/>
        {/* <Route path="/" Component={Room}/> */}
     
      </Router>
    );
  }


export default App;
   