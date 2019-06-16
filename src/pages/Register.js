import React from "react";
import firebase from "../firebaseConfig";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import logo from "../assets/logo-ygroup.png";
import ErrorAlert from "../components/Alert";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      type: "kitchen",
      show: false
    };
  }

  handleChange = (event, elem) => {
    const newState = this.state;
    newState[elem] = event.target.value;
    this.setState(newState);
  };

  handleCloseError = () => {
    this.setState({
      show: false
    });
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
      })
      .catch(error => {
        this.setState({
          show: true
        });
      });
  };

  render() {
    const { show } = this.state;
    return (
      <div className="bg-intro text-center">
        <Container>
          <ErrorAlert show={show} handleCloseError={this.handleCloseError}>
            {this.props.error}
          </ErrorAlert>
          <Row>
            <Col sm={{ span: 6, offset: 3 }}>
              <img src={logo} alt="logo" className="logo mb-5" />

              <Form>
                <Form.Group controlId="formName">
                  <Form.Control
                    value={show.name}
                    onChange={e => this.handleChange(e, "name")}
                    placeholder="Digite seu nome"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Control
                    value={show.email}
                    type="email"
                    onChange={e => this.handleChange(e, "email")}
                    placeholder="Digite seu email"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control
                    value={show.password}
                    type="password"
                    onChange={e => this.handleChange(e, "password")}
                    placeholder="Digite sua senha"
                  />
                </Form.Group>

                <Form.Group
                  value={show.type}
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
                type="submit"
                className="outline-orange mb-5"
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
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Register);
