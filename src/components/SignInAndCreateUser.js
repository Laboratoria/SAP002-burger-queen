import React from 'react';
import Button from './Button';
import './SignInAndCreateUser.css';
import logoBurgerQueen from '../assets/logo-burger-queen.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { Form, FormCheck, FormControl, Row, Col, Container, Card, CardGroup, Nav, TabContainer, Tabs, Tab, TabContent, TabPane } from 'react-bootstrap';


const firebaseAppAuth = firebase.auth();

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

    console.log(newState)
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {

      })
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {

      })
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log("foi")
  }

  render(props) {
    console.log(this.props)
    return (
      <div>
        {/* <div>
          <input placeholder="Digite seu nome" value={this.state.name}
            onChange={(event) => this.handleChange(event, "name")} />
          <input placeholder="Digite seu email" value={this.state.email}
            onChange={(event) => this.handleChange(event, "email")} />
          <input placeholder="Digite sua senha" value={this.state.password}
            onChange={(event) => this.handleChange(event, "password")} />
          <input type="radio" name="occupationArea" value="saloon" onChange={(event) => this.handleChange(event, "occupationArea")} checked={this.state.occupationArea === "saloon"} />
          Salão
        <input type="radio" name="occupationArea" value="kitchen" onChange={(event) => this.handleChange(event, "occupationArea")} checked={this.state.occupationArea === "kitchen"} />
          Cozinha
        <Button text="Entrar" onClick={this.createUser} />
        </div> */}

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
                        <Form.Control size="lg" type="email" placeholder="Email" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalPassword">
                      <Col xs={6} md={6} lg={12}>
                        <Form.Control type="password" placeholder="Senha (mínimo 6 caracteres)" />
                      </Col>
                    </Form.Group>
                    <Col xs={6} md={6} lg={12} className="justify-content-md-center btn-div">
                      <Button text="Entrar" onClick={this.login} />
                    </Col>
                  </Form>

                </Tab>
                <Tab eventKey="create-user" title="Criar Conta" className="nav-link">

                  <Form>
                    <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalName">
                      <Col xs={6} md={6} lg={12}>
                        <Form.Control type="text" placeholder="Nome" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalEmail">
                      <Col xs={6} md={6} lg={12}>
                        <Form.Control size="lg" type="email" placeholder="Email" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="justify-content-md-center" controlId="formHorizontalPassword">
                      <Col xs={6} md={6} lg={12}>
                        <Form.Control type="password" placeholder="Senha (mínimo 6 caracteres)" />
                      </Col>
                    </Form.Group>
                    <fieldset>
                      <Form.Row>
                        <Form.Group as={Row} className="justify-content-md-center">
                          <Col sm={6}>
                            <Form.Check
                              type="radio"
                              label="Salão"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios1"
                              className="check"
                            />
                          </Col>
                          <Col sm={6}>
                            <Form.Check
                              type="radio"
                              label="Cozinha"
                              name="formHorizontalRadios"
                              id="formHorizontalRadios1"
                              className="check"
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

      </div >

    );
  }
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }


// handleClick = () => {
//   const obj = {
//     email: this.state.email
//   }
//   database.collection('users').add(obj)


// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }



export default withFirebaseAuth({
  firebaseAppAuth,
})(SignInAndCreateUser);
