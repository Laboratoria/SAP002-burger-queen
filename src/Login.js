import React from 'react'
import firebase from './firebaseConfig'
import LoginComponent from "./components/LoginComponent"
import SignUpComponent from "./components/SignUpComponent"
import { Row, Col, Button } from 'react-bootstrap'


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
    this.createUser = this.createUser.bind(this);
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

  login(event) {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.emailLogin, this.state.passwordLogin)
      .then(resp => {
        const id = resp.user.uid;
        firebase.firestore().collection("users").doc(id).get()
          .then(resp => {
            this.props.history.push(`/${resp.serviço}/?id=${id}`)
          })
      })

  }

  createUser(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.emailSignUp, this.state.passwordSignUp)
      .then(resp => {
        const id = resp.user.uid;
        if (resp) {
          firebase.firestore().collection('users').doc(id)
          .set({
            email: this.state.emailSignUp,
            nome: this.state.name,
            serviço: this.state.service
          })
        }
        this.props.history.push(`/${this.state.service}/?${id}`)
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
            login={this.login}
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
            createUser={this.createUser}
          />

        </Col>
      </Row>

    )
  }
}

export default LoginContainer