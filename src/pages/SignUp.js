import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import login from '../img/login.jpg';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardLink, Button, Form, FormGroup, Input, Badge } from 'reactstrap';



const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      name: '',
      email: '',
      password: '',
      type: ''
    };
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value })
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleChangeType = (event) => {
    this.setState({ type: event.target.value })
  }

  createUser = () => {
    if (this.state.type === '' || this.state.name === '') {
      alert('Preencha todos os campos.');
    } else {
      this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(resp => {
          if (resp) {
            const id = resp.user.uid;
            database.collection('users').doc(id).set({
              nome: this.state.name,
              email: this.state.email,
              tipo: this.state.type
            })
              .then(() => {
                this.props.history.push(`/${this.state.type}`);
              });
          } else {
            alert(this.props.error);
          }
        })
    }
  }

  render() {
    return (
      <Container className='d-flex justify-content-center' fluid>
        <Card className='card' style={{ width: '25rem' }}>
          <CardImg variant='top' src={login} className='img-responsive' />
          <CardBody>
            <CardTitle className='d-flex justify-content-center'>
              <h1>Cadastro</h1>
            </CardTitle>
            <CardText>
              <Form>
                <FormGroup className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'><i className='fas fa-user'></i></span>
                  </div>
                  <Input type='text' className='form-control' value={this.state.name}
                    placeholder='Digite seu nome' onChange={this.handleChangeName} />
                </FormGroup>

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
                  <Input type='password' className='form-control' value={this.state.senha}
                    placeholder='Digite sua senha' onChange={this.handleChangePassword} />
                </FormGroup>

                <FormGroup>
                  <Container>
                    <Row>
                      <Col><h5>Usuário:</h5></Col>
                      <Col>
                        <Input type='radio' name='user' value='cozinha' onChange={this.handleChangeType}/> Cozinha
			    	    	    </Col>
                      <Col>
                        <Input type='radio' name='user' value='salao' onChange={this.handleChangeType} /> Salão
			    	    	    </Col>
                    </Row>
                  </Container>
                </FormGroup>

                <FormGroup className='d-flex justify-content-center'>
                  <Button onClick={this.createUser} color='warning'>Cadastrar</Button>
                </FormGroup>
              </Form>
            </CardText>
            <CardLink>
              <p className='d-flex justify-content-center'>Já tem acesso?
                <Link to='/'>Entrar</Link>
              </p>
            </CardLink>
          </CardBody>
        </Card>
      </Container>

    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(SignUp)

