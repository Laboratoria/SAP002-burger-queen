import React from 'react';
import Button from '../Button';
import firebase from '../firebaseConfig';
import {Link} from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  // createUser = () => {
  //   this.props.createUserWithEmailAndPassword
  //     (this.state.email, this.state.senha)
  //     .then(() => {
  //       alert("Cadastro feito com sucesso!");

  //     });
  // }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password);
      // fazer aqui o redierct

  }

  signOut = (e) => {
    e.preventDefault();
    const { signOut } = this.props;
    signOut();
  }

  render() {
    return (
      <div>
        <h1>Burger Queen App</h1>
        <input value={this.state.email}
          placeholder="email"
          onChange={(e) => this.handleChange(e, "email")} />
        <input value={this.state.password}
          placeholder="senha"
          onChange={(e) => this.handleChange(e, "password")} />
        <Button text="Entrar" onClick={this.signIn} />
        <Button text="Sair" onClick={this.signOut} />
        <Link to="/Cadastro">Cadastre-se</Link>
        
        
      </div>

    )
  }
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);

//<Button text="Cadastre-se" onClick={this.createUser} />