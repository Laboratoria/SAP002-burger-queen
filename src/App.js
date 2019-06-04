import React from 'react';
import './App.css';
import firebase from "./firebaseConfig";
import Button from "./components/Button"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: ""
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    this.setState({
      userType: {}
    })
    alert(this.state.email)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input value={this.state.email} 
            placeholder="Digite seu email"
            onChange={(e) => this.handleChange(e, "email")}
          />
          <input value={this.state.password} 
            placeholder="Digite sua senha"
            onChange={(e) => this.handleChange(e, "password")}
          />
          <Button text="clique aqui" onClick={this.handleClick}/>
        </header>
      </div>
    )
  }
  }

export default App;