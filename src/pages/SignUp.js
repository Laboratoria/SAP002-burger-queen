import React from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup } from 'reactstrap';
import Login from '../layouts/Login';
import Footer from '../layouts/FooterLink';
import Button from '../components/Button';
import Input from '../components/Input';
import Radio from '../components/Radio';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
              name: this.state.name,
              email: this.state.email,
              type: this.state.type
            })
              .then(() => {
                this.props.history.push(`/${this.state.type}`);
              });
          } else {
            alert(this.props.error);
          }
        })
    }
  };

  render() {
    return (
      <Container className='d-flex justify-content-center' fluid>
        <Card className='card' style={{ width: '35rem' }}>
          <Login title='Cadastro' />
          <CardBody>
            <Form>
              <Input type='text' icon='fas fa-user' value={this.state.name}
                placeholder='Digite seu nome' onChange={this.handleChangeName} />
              <Input type='email' icon='fas fa-at' value={this.state.email}
                placeholder='Digite seu e-mail' onChange={this.handleChangeEmail} />
              <Input type='password' icon='fas fa-key' value={this.state.senha}
                placeholder='Digite sua senha' onChange={this.handleChangePassword} />
              <FormGroup>
                <Container>
                  <Row>
                    <Col><h5>Usuário:</h5></Col>
                    <Radio text='Cozinha' name='user' value='kitchen' onChange={this.handleChangeType} />
                    <Radio text='Salão' name='user' value='salon' onChange={this.handleChangeType} />
                  </Row>
                </Container>
              </FormGroup>
              <FormGroup className='d-flex justify-content-center'>
                <Button text='Cadastrar' color='warning' icon='fas fa-user-plus' onClick={this.createUser} />
              </FormGroup>
            </Form>
            <Footer msg='Já tem acesso?' link='/' text='Entrar' />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(SignUp)

