import React from 'react';
import Button from './Button';
import './Saloon.css';
import products from './Menu.json'
import logoBurgerQueen from '../assets/logo-burger-queen.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Container, ListGroup, Card } from 'react-bootstrap';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: [],
      name: "",
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    database.collection('users')
      .doc(id)
      .get()
      .then(response => {
        const { name } = response.data();
        this.setState({
          name,
        })
      })
  }


  render(props) {

    return (
      <div className="div-header">
        <Container>
          <Col xs={6} md={6} lg={12} >
            <div className="div-header-saloon">
              <div className="div-logo-saloon">
                <img src={logoBurgerQueen} className="logo-saloon" alt="logo do Burger Queen, coroa acima do nome" />
              </div>
              <div className="kitchen">
                <p className="welcome-kitchen">Boas Vindas à Cozinha</p>
              </div>
              <div className="div-user-name">
                <FontAwesomeIcon icon={faUserCircle} className="user-name" />
                <p className="name-user">{this.state.name}</p>
              </div>
            </div>
            <div>
              <Card style={{ width: '18rem' }}>
                <Card.Header>Cliente</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item></ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </Col>
        </Container >
      </div >
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Kitchen);