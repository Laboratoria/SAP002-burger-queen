import React from 'react';
import { Container, Card, CardBody, Form, FormGroup } from 'reactstrap';
import Login from '../layouts/Login';
import Footer from '../layouts/FooterLink';
import Button from '../components/Button';
import Input from '../components/Input';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

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
          <Login title='Login' />
          <CardBody>
            <Form>
              <Input type='email' icon='fas fa-at' value={this.state.email}
                placeholder='Digite seu e-mail' onChange={this.handleChangeEmail} />
              <Input type='password' icon='fas fa-key' value={this.state.password}
                placeholder='Digite sua senha' onChange={this.handleChangePassword} />
              <FormGroup className='d-flex justify-content-center'>
                <Button text='Entrar' color='warning' icon='fas fa-sign-in-alt' onClick={this.signIn} />
              </FormGroup>
            </Form>
            <Footer msg='Não tem acesso?' link='/signup' text='Cadastre-se' />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Home)

