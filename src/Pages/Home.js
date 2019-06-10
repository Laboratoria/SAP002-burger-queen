import React from 'react';
import Button from '../Button';
import firebase from '../firebaseConfig';
import { Link } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      place: "salao",
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, 
      this.state.password,)
      .then((resp) => {
      const id = resp.user.uid;
      database.collection("users").doc(id).get()
        .then(resp => {
          const data = resp.data();
            this.props.history.push(`/${data.place}`);
          })
        });
    }

  // signOut = (e) => {
  //   e.preventDefault();
  //   const { signOut } = this.props;
  //   signOut();
  // }

  render() {
        return(
      <div>
      <h1>Login</h1>
      <input value={this.state.email}
        placeholder="email"
        onChange={(e) => this.handleChange(e, "email")} />
      <input value={this.state.password}
        placeholder="senha"
        onChange={(e) => this.handleChange(e, "password")} />
      <br></br>
      <Button text="Entrar" onClick={this.signIn} />
      <br></br>
      <Link to="/Cadastro">Cadastre-se</Link>
      </div >

    )
  }
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);
