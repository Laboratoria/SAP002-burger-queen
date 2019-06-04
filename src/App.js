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
    // this.setState({
    //   userType: {}
    // })
    alert(this.state.userType)
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
          <input type="radio" name="userType" value="salon"
            onChange = {(e) => this.handleChange(e, "userType")}
          />
          <span>Salão</span>
          <input type="radio" name="userType" value="kitchen"
            onChange = {(e) => this.handleChange(e, "userType")}
          />
          <span>Cozinha</span>
          <Button text="clique aqui" onClick={this.handleClick}/>
          <p>{this.state.userType !== "salon" ? "Cozinha" : "Salão"}</p>
        </header>
      </div>
    )
  }
  }

export default App;