import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import login from '../img/login.jpg';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardLink, Button, Form, FormGroup, Input } from 'reactstrap';

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        if (resp) {
          const id = resp.user.uid;
          database.collection('users').doc(id).get()
            .then(resp => {
              const data = resp.data();
              this.props.history.push(`/${data.type}`);
            })
        } else {
          alert(this.props.error);
        }
      })
  }

  render() {
    return (
      <Container className='d-flex justify-content-center' fluid>
        <Card className='card' style={{ width: '35rem' }}>
          <CardImg variant='top' src={login} className='img-responsive' />
          <CardBody>
            <CardTitle className='d-flex justify-content-center'>
              <h1>Login</h1>
            </CardTitle>
            <CardText>
              <Form>
                <FormGroup className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'><i className='fas fa-at'></i></span>
                  </div>
                  <Input type='email' className='form-control' value={this.state.email}
                    placeholder='Digite seu e-mail' onChange={this.handleChangeEmail} />
                </FormGroup>
                <FormGroup className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'><i className='fas fa-key'></i></span>
                  </div>
                  <Input type='password' className='form-control' value={this.state.password}
                    placeholder='Digite sua senha' onChange={this.handleChangePassword} />
                </FormGroup>
                <FormGroup className='d-flex justify-content-center'>
                  <Button onClick={this.signIn} color='warning'><i class='fas fa-sign-in-alt'></i> Entrar</Button>
                </FormGroup>
              </Form>
            </CardText>
            <CardLink>
              <p className='d-flex justify-content-center'>Não tem acesso? <Link to='/SignUp'>Cadastre-se</Link></p>
            </CardLink>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Home)

