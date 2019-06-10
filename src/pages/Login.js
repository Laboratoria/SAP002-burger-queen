import React from 'react';
// import Modal from  'Modal'
import firebase from "../firebaseConfig";
import { Form, Col, Button } from 'react-bootstrap';
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
      place: ''
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
    this.props.createUserWithEmailAndPassword
      (this.state.email, this.state.password)
      .then(resp => {
        if (resp) {
          const id = resp.user.uid;
          database.collection("users").doc(id).set({
            email: this.state.email,
            place: this.state.place
            // nome: this.state.nome
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
      (this.state.email, this.state.password)
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

  // handleClose() {
  //   this.setState({ show: false });
  // }

  // handleShow() {
  //   this.setState({ show: true });
  // }

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    return (
      <div className="m-5">
        {/* <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button> */}
        <Col>
          <header className="d-flex justify-content-center">
            <img src={logo} alt="Logo" className="red-border py-3 px-5" />
          </header>
          <body>
            <form className="d-flex justify-content-center bg-red mt-5 red-border ">
              <Form className="w-50 m-5" >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="white-text">E-mail</Form.Label>
                  <Form.Control className="white-text" value={this.state.email} onChange={(event) => this.handleChange(event, "email")} type="email" placeholder="Digite seu E-mail" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="white-text">Senha</Form.Label>
                  <Form.Control className="white-text" value={this.state.password} onChange={(event) => this.handleChange(event, "password")} type="password" placeholder="Digite sua Senha" />
                </Form.Group>
                <div className="d-flex justify-content-center flex-column">
                  <div className="d-flex justify-content-center my-2">
                    <p className="white-text">Escolha o Ambiente:</p>
                  </div>
                  <form className="d-flex justify-content-center">
                    <div className="d-flex flex-row mx-2 align-items-baseline">
                      <input type="radio" name="optradio" className="white-text mx-2" value="DinnerHall" onChange={(event) => this.handleChange(event, "place")} /><p className="white-text">Salão</p>
                    </div>
                    <div className="d-flex flex-row mx-2 align-items-baseline">
                      <input type="radio" name="optradio" className="mx-2 radio-menu" value="DinnerKitchen" onChange={(event) => this.handleChange(event, "place")} /><p className="white-text">Cozinha</p>
                    </div>
                  </form>
                </div>
                <div className="d-flex flex-column justify-content-around">
                  <button type="submit" className="m-2 bg-white red-text red-border p-2" onClick={(event) => this.signIn(event)}>Entrar</button>
                  <button type="button" className="mx-2 mt-3 bg-red white-text border-0" onClick={(event) => this.createUser(event)}><u>Cadastrar</u></button>
                </div>
              </Form>
            </form>
          </body>
        </Col>
      </div>
    )
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Login);


