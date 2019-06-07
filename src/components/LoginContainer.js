import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import firebase from '../firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import LoginComponent from './LoginComponent'
import SignUpComponent from './SignUpComponent'

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      emailLogin: "",
      passwordLogin: "",
      emailSignUp: "",
      passwordSignUp: "",
      service: "",
      modalShow: false

    };
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(event) {
    const { name, value,  } = event.target
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

  createUser() {
    this.props.createUserWithEmailAndPassword
    (this.state.emailSignUp, this.state.passwordSignUp)
    .then(resp => {
      const id = resp.user.id
      database.collection("users").doc(id).set({
        email: this.state.emailSignUp,
        nome: this.state.name
      })
    })
  }
  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Row className="justify-content-md-center">
        <Col md={4}>

          <LoginComponent
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            data={this.state}
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
            />

        </Col>
      </Row>

    )
  }
}

export default withFirebaseAuth({firebaseAppAuth})(LoginContainer)