import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
//import Salon from './components/Salon'
//import Kitchen from './components/Kitchen'
//import firebase from './firebaseConfig'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Signup />
      </div>
    )
  }
}

export default App
