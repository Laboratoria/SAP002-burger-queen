import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom'
import firebaseApp from "../firebaseConfig";
import '../components/Menu.css';
import '../components/Header.css';
import logo from '../assets/logo.png'
import withFirebaseAuth from 'react-with-firebase-auth'

const firebaseAppAuth = firebaseApp.auth();
const database = firebaseApp.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleChange = (e, element) => {
    const newState = this.state;
    newState[element] = e.target.value;
    this.setState(newState)
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).then(resp =>
      database.collection('users').doc(resp.user.uid).get()
        .then(resp => {
          console.log(this.props.history)
          this.props.history.push(`/${resp.data().type}`)
        })
    );
  }

  render() {
    return (
      <div className="Home">
        <div className="mx-auto login-container">
          <div className="mx-auto">
            <div className="Home-logo-container justify-content-center mr-1 py-3">
              <figure className="Home-logo">
                <img src={logo} alt="" className="Home-logo-img"></img>
              </figure>
              <h1 className="Home-logo-text">Burger<br></br>Queen</h1>
            </div>
          </div>
          <div className="input-container">
            <div className=" container w-100">
              <br></br>
              <br></br>
              <input type="text"
                value={this.state.email}
                placeholder="E-mail"
                onChange={(e) => this.handleChange(e, "email")}
                className="Home-input mx-auto p-1 my-2 row">
              </input>
              <input type="password"
                value={this.state.password}
                placeholder="Senha"
                onChange={(e) => this.handleChange(e, "password")}
                className="Home-input mx-auto p-1 my-2 row">
              </input>
              <Link to={"/signup"} className="gray align-right p-4" activeClassName="none">Cadastre-se</Link>
            </div>
          </div>
          <div className="enter" onClick={this.signIn}>
            <p className="py-5 m-0 text-center">ENTRAR</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);

