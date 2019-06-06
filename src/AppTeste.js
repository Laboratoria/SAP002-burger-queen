import React from 'react';
import './App.css';
import Button from './Button.js';
import firebase from "./firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 
'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      banana: "",
      peixinho: "",
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
      banana: this.state.banana,
      peixinho: this.state.peixinho
    }
    database.collection('laboratoria').add(object)   
    this.setState({
      listItem:  this.state.listItem.concat(object)   
    })
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword
    (this.state.email, this.state.password);
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword
    (this.state.email, this.state.password)
      // .then(() => {
      //   alert("Cadastro feito com sucesso!");

      // })
  }

  render() {

    console.log(this.props)

    return (
      <div className="App">
        <header className="App-header">
          <h1>Burger Queen App</h1>
          <input value={this.state.email}
            placeholder="email"
            onChange={(e) => this.handleChange(e, "email")} />
          <input value={this.state.password}
            placeholder="password"
            onChange={(e) => this.handleChange(e, "password")} />
          <Button text="Entrar" onClick={this.signIn} />
          <Button text="Cadastrar" onClick={this.createUser} />
          
          
          <input value={this.state.banana}
            placeholder="banana"
            onChange={(e) => this.handleChange(e, "banana")} />
          <input value={this.state.peixinho}
            placeholder="peixinho"
            onChange={(e) => this.handleChange(e, "peixinho")} />
          <Button text="ClickBP" onClick={this.handleClick} />

          {
            this.state.listItem.map((item, index) => {
              return <p key={index}>
              {item.banana} | {item.peixinho}</p>
            })
          }
        </header>
      </div>
    );
  }
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(App);



// import React from 'react';
// import './App.css';
// import Home from './pages/Home';
// import Salao from './pages/Salao';
// import { BrowserRouter as Router, Route, Redirect } from
//   'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <Route path="/" exact component={Home} />
//           <Route path="/salao" component={Salao} />
//         </header>
//       </div>
//     </Router>
//   );
// }


// export default App;
