import React from 'react';
import './App.css';
import firebase from "./firebaseConfig";
import Button from "./components/Button"

const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "",
      listItem: []
    };
  }

  componentDidMount() {
    database.collection('users').get()
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
      userType: this.state.userType
    }
    database.collection('users').add({object})
    alert(this.state.userType)
  }
   
  render() {
    const { email, password, listItem } = this.state;
    console.log(listItem  )
    return (
      <div className="App">
        <header className="App-header">
          <input value={email} 
            placeholder="Digite seu email"
            onChange={(e) => this.handleChange(e, "email")}
          />
          <input value={password} 
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
          {
            listItem.map((item, index) => {
              return <p key={index}> { item.object.userType } </p>
            })
          }
        </header>
      </div>
    )
  }
  }

export default App;