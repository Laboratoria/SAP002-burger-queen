import React from "react";
import firebase from "../firebaseConfig";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import logo from "../assets/logo-ygroup.png";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <img src={logo} alt="logo" className="logo mb-5" />
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

            <Button className="orange" onClick={this.signIn} block>
              ENTRAR
            </Button>
            <Button
              className="outline-orange"
              onClick={() => {
                this.props.history.push("/register");
              }}
              block
            >
              CADASTRAR-SE{" "}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Login);
