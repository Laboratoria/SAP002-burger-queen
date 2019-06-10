import React from 'react'
import LoginComponent from "./LoginComponent"
import SignUpComponent from "./SignUpComponent"
import { Row, Col, Button } from 'react-bootstrap'
import firebase from '../firebaseConfig'

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      emailLogin: "",
      passwordLogin: "",
      emailSignUp: "",
      passwordSignUp: "",
      service: "",
      modalShow: false

    };
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleClick(event) {
    const { name, value, } = event.target
    this.setState({
      [name]: value
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.emailLogin, this.state.passwordLogin).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.emailSignUp, this.state.passwordSignUp).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Row className="justify-content-md-center mt-5">
        <Col md={4}>

          <LoginComponent
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            data={this.state}
            onClick={this.login}
          />

          <Button
            variant="primary"
            onClick={() => this.setState({ modalShow: true })}
            block
          >
            Cadastro
        </Button>

          <SignUpComponent
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            data={this.state}
            modalShow={this.state.modalShow}
            modalClose={modalClose}
            createUser={this.signup}
          />

        </Col>
      </Row>

    )
  }
}

export default LoginContainer