import React from 'react';
import '../App.css';
import Button from '../Button'
import firebase from '../firebaseConfig';
// import { database } from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "",
      food: "",
      listItem: []
    };
  }

  componentDidMount() {
    database.collection('laboratoria').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({listItem: data});
      });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    const object = {
      email: this.state.email,
      password: this.state.password
    }
    database.collection('laboratoria').add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
  }

  
  render() {
    return (
      <div>
          <input value={this.state.order}
            placeholder="Digite seu pedido"
            onChange={(e) => this.handleChange(e, "order")} />
          <input value={this.state.food}
            placeholder="Digite sua comida"
            onChange={(e) => this.handleChange(e, "food")} />
            <Button text="Login" onClick={this.handleClick} />            
            {
                this.UNSAFE_componentWillMount.state.listItem.map((item, index) => {
                    return <p key={index}>{item.order} | {item.food}</p>
                })
            }
            <Link to="Home">Home</Link>
      </div>
    )
  }
}

export default withFirebaseAuth({firebaseAppAuth,
})(App);
