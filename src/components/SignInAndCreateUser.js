import React from 'react';
import Button from './Button';
import './SignInAndCreateUser.css';
import logoBurgerQueen from '../assets/logo-burger-queen.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { Form, Row, Col, Container, Tabs, Tab } from 'react-bootstrap';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class SignInAndCreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      occupationArea: ""
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  };

  createUser = (event) => {
    event.preventDefault()
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        const userId = response.user.uid;
        database.collection("users").doc(userId).set({
          name: this.state.name,
          email: this.state.email,
          occupationArea: this.state.occupationArea
        });
      })
      .then(response => {
        console.log(response)
        const userId = response.user.uid;
        this.props.history.push(`/${this.state.occupationArea}/${userId}`);
      })
      .catch((error) => {
        alert(this.props.error)
      })
  };

  signIn = (event) => {
    event.preventDefault()
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        const userId = response.user.uid;
        database.collection("users").doc(userId).get()
          .then(response => {
            const data = response.data()
            this.props.history.push(`/${data.occupationArea}/${response.id}`);
          })
      })
      .catch((error) => {
        alert(this.props.error)
      })
  };

  render(props) {
    return (
      <div>
        <Container className="container-signin">
          <Col xs={6} md={6} lg={12} >
            <div className="div-logo">
              <img src={logoBurgerQueen} className="justify-content-md-center logo" alt="logo do Burger Queen, coroa acima do nome" />
            </div>
            <Tabs defaultActiveKey="login" transition={false} id="noanim-tab-example" className="tabs">
              <Tab eventKey="login" title="Login" className="justify-content-md-center nav-link">
                <Form>
                  <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalEmail">
                    <Col xs={6} md={6} lg={12}>
                      <Form.Control size="lg" type="email" placeholder="Email" value={this.state.email}
                        onChange={(event) => this.handleChange(event, "email")} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalPassword">
                    <Col xs={6} md={6} lg={12}>
                      <Form.Control type="password" placeholder="Senha (mínimo 6 caracteres)" value={this.state.password}
                        onChange={(event) => this.handleChange(event, "password")} />
                    </Col>
                  </Form.Group>
                  <Col xs={6} md={6} lg={12} className="justify-content-md-center btn-div">
                    <Button text="Entrar" onClick={this.signIn} />
                  </Col>
                </Form>
              </Tab>
              <Tab eventKey="create-user" title="Criar Conta" className="nav-link">
                <Form>
                  <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalName">
                    <Col xs={6} md={6} lg={12}>
                      <Form.Control type="text" placeholder="Nome" value={this.state.name}
                        onChange={(event) => this.handleChange(event, "name")} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalEmail">
                    <Col xs={6} md={6} lg={12}>
                      <Form.Control size="lg" type="email" placeholder="Email" value={this.state.email}
                        onChange={(event) => this.handleChange(event, "email")} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalPassword">
                    <Col xs={6} md={6} lg={12}>
                      <Form.Control type="password" placeholder="Senha (mínimo 6 caracteres)" value={this.state.password}
                        onChange={(event) => this.handleChange(event, "password")} />
                    </Col>
                  </Form.Group>
                  <fieldset>
                    <Form.Row>
                      <Form.Group as={Row} className="justify-content-md-center">
                        <Col sm={6}>
                          <Form.Check
                            type="radio"
                            label="Salão"
                            id="formHorizontalRadios1"
                            className="check"
                            name="occupationArea"
                            value="saloon"
                            onChange={(event) => this.handleChange(event, "occupationArea")}
                            checked={this.state.occupationArea === "saloon"}
                          />
                        </Col>
                        <Col sm={6}>
                          <Form.Check
                            type="radio"
                            label="Cozinha"
                            id="formHorizontalRadios1"
                            className="check"
                            name="occupationArea"
                            value="kitchen"
                            onChange={(event) => this.handleChange(event, "occupationArea")}
                            checked={this.state.occupationArea === "kitchen"}
                          />
                        </Col>
                      </Form.Group>
                    </Form.Row>
                  </fieldset>
                  <Col xs={6} md={6} lg={12} className="justify-content-md-center">
                    <Button text="Criar Conta" onClick={this.createUser} />
                  </Col>
                </Form>
              </Tab>
            </Tabs>
          </Col>
        </Container>
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(SignInAndCreateUser);
