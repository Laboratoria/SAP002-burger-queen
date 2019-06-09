import React from "react";
import firebase from "../firebaseConfig";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import logo from "../assets/logo-ygroup.png";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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

  createUser = () => {
    this.props
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        const id = resp.user.uid;
        database
          .collection("users")
          .doc(id)
          .set({
            email: this.state.email,
            name: this.state.name,
            type: this.state.type
          });
      })
      .then(() => {
        this.props.history.push(`/${this.state.type}`);
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <img src={logo} alt="logo" className="logo mb-5" />
            <Form>
              <Form.Group controlId="formName">
                <Form.Control
                  value={this.state.name}
                  onChange={e => this.handleChange(e, "name")}
                  placeholder="Digite seu nome"
                />
              </Form.Group>

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

              <Form.Group
                value={this.state.type}
                onChange={e => this.handleChange(e, "type")}
              >
                <Form.Check
                  inline
                  type="radio"
                  label="Cozinha"
                  value="kitchen"
                  name="radioType"
                  defaultChecked
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Salão"
                  value="lounge"
                  name="radioType"
                />
              </Form.Group>
            </Form>
            <Button className="orange" onClick={this.createUser} block>
              CADASTRAR-SE{" "}
            </Button>
            <Button
              className="outline-orange"
              onClick={() => {
                this.props.history.push("/");
              }}
              block
            >
              VOLTAR
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Register);
