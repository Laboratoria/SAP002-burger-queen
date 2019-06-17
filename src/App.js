import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Salon from './components/Salon'
import Kitchen from './components/Kitchen'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
//import firebase from './firebaseConfig'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" component={Signup}/>
        </div>
      </Router>  
    )
  }
}

export default App
