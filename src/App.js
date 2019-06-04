import React from 'react';
import './App.css';
import Button from './Button.js';
import firebase from "./firebaseConfig";
//import { database } from 'firebase';

const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      listItem: []
    };
  }

  componentDidMount() {
    database.collection('laboratoria').get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.data());
      this.setState({ listItem: data });
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
      listItem:  this.state.listItem.concat(object)   
    })
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Burger Queen App</h1>
          <input value={this.state.email}
            placeholder="e-mail"
            onChange={(e) => this.handleChange(e, "email")} />
          <input value={this.state.password}
            placeholder="senha"
            onChange={(e) => this.handleChange(e, "password")} />
          <Button text="Entrar" onClick={this.handleClick} />
          {
            this.state.listItem.map((item, index) => {
              return <p key={index}>
              {item.email} | {item.password}</p>
            })
          }
        </header>
      </div>
    );
  }
}


export default App;
