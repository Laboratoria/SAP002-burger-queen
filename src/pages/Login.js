import React from 'react';
import Modal from './Modal'
import firebase from "../firebaseConfig";
import { Form, Col} from 'react-bootstrap';
import logo from '../assets/img/logo-large.png';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      passwordlogin: '',
      emaillogin: '',
      place: '',
      show: false
    };
  }

  handleChange = (event, element) => {
    event.preventDefault();
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        if (resp) {
          const id = resp.user.uid;
          database.collection("users").doc(id).set({
            name: this.state.name,
            email: this.state.email,
            place: this.state.place
          })
            .then(() => {
              this.props.history.push(`/${this.state.place}`);
            });
        }
      })
  }

  signIn = (event) => {
    event.preventDefault();
    this.props.signInWithEmailAndPassword
      (this.state.emaillogin, this.state.passwordlogin)
      .then((resp) => {
        console.log(resp);
        const id = resp.user.uid;
        database.collection("users").doc(id).get()
          .then(resp => {
            const data = resp.data();
            this.props.history.push(`/${data.place}`);
          })

      });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    // if (this.props.error) {
    //   alert(this.props.error);
    // }
    return (
      <div className="m-5">
        <Col>
          <header className="d-flex justify-content-center">
            <img src={logo} alt="Logo" className="red-border py-3 px-5" />
          </header>
          <body>
            <form className="d-flex justify-content-center bg-red mt-5 red-border ">
              <Form className="w-50 m-5" >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="white-text">E-mail</Form.Label>
                  <Form.Control className="white-text" value={this.state.emaillogin} onChange={(event) => this.handleChange(event, "emaillogin")} type="email" placeholder="Digite seu E-mail" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="white-text">Senha</Form.Label>
                  <Form.Control className="white-text" value={this.state.passwordlogin} onChange={(event) => this.handleChange(event, "passwordlogin")} type="password" placeholder="Digite sua Senha" />
                </Form.Group>
                <div className="d-flex flex-column justify-content-around">
                  <button type="submit" className="m-2 bg-white red-text red-border p-2" onClick={(event) => this.signIn(event)}>Entrar</button>
                  <button type="button" className="mx-2 mt-3 bg-red white-text border-0" onClick={this.handleShow}><u>Cadastrar</u></button>
                </div>
              </Form>
            </form>
          </body>
        </Col>
        <Modal
          handleChange={this.handleChange}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
          createUser={this.createUser}
          show={this.state.show}
          data={this.state} />
      </div>

    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Login);


