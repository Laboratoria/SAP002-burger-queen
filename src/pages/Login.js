import React from "react";
import firebase from "../firebaseConfig";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import logo from "../assets/logo-ygroup.png";
import ErrorAlert from "../components/Alert";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
              </Form>

              <Button className="orange" onClick={this.signIn} block>
                ENTRAR
              </Button>
              <Button
                className="outline-orange mb-5"
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
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Login);
