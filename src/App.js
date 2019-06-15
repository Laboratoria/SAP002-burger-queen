import React from 'react';
import './App.css';
import Login from './pages/Login';
import Hall from './pages/Hall';
import Kitchen from './pages/Kitchen'
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
       <Route path="/" exact component={Login}/>
       <Route path="/hall" component={Hall}/>
       <Route path="/kitchen" component={Kitchen}/>
        
      </header> 
    </div>
    </Router>
  );
}





export default App;
