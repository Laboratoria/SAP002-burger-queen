import React from 'react'
//import './App.css'
//import firebase from "./firebaseConfig"
import Signup from "./components/Signup"
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Signup />
      </div>
    )
  }
}

export default App;
