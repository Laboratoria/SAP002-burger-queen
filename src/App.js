import React from "react"
import firebase from './firebaseConfig'
import Login from "./components/Login"
import Hall from "./components/Hall"
import Kitchen from "./components/Kitchen"
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid });
        localStorage.setItem('user', user.uid);

      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <>
        <Router>
          <Route exact path="/salão" component={Hall} />
          <Route exact path="/cozinha" component={Kitchen} />
          <Route exact path="/" component={Login} />
        </Router>
      </>
    )
  }
}
export default App