import React from "react";
import firebase from "../firebaseConfig";
import { Form, Button } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: "kitchen"
    };
  }

  handleChange = (event, elem) => {
    const newState = this.state;
    newState[elem] = event.target.value;
    this.setState(newState);
  };

  signIn = () => {
    this.props
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        const id = resp.user.uid;
        database
          .collection("users")
          .doc(id)
          .get()
          .then(resp => {
            const data = resp.data();
            this.props.history.push(`/${data.type}`);
          });
      });
  };

  render() {
    return (
      <div>
        <h1>#BurgerQueen</h1>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Control
              value={this.state.email}
              type="email"
              onChange={e => this.handleChange(e, "email")}
              placeholder="Digite seu email"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              value={this.state.password}
              type="password"
              onChange={e => this.handleChange(e, "password")}
              placeholder="Digite sua senha"
            />
          </Form.Group>
        </Form>

        <Button variant="warning" onClick={this.signIn}>
          Entrar
        </Button>
        <Button
          variant="outline-warning"
          onClick={() => {
            this.props.history.push("/register");
          }}
        >
          Cadastre-se
        </Button>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Login);
