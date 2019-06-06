import React from "react";
import "./App.css";
import firebase from "./firebaseConfig";
import { Button } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = (event, elem) => {
    const newState = this.state;
    newState[elem] = event.target.value;
    this.setState(newState);
  };

  handleClick = () => {
    alert(this.state.email);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>#BurgerQueen</h1>

          <input
            value={this.state.email}
            placeholder="Digite seu email"
            onChange={e => this.handleChange(e, "email")}
          />
          <input
            value={this.state.password}
            placeholder="Digite sua senha"
            onChange={e => this.handleChange(e, "password")}
          />

          <Button variant="warning" onClick={this.handleClick}>
            Clique Aqui
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
