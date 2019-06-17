import React from 'react';
import ButtonConfirm from './Button';
import products from './Menu.json';
import './Kitchen.css';
import logoBurgerQueen from '../assets/logo-burger-queen.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Container, ListGroup, Card } from 'react-bootstrap';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      client: "",
      request: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    database.collection("users")
      .doc(id)
      .get()
      .then(response => {
        const { name } = response.data();
        this.setState({
          name,
        })
      })

    database.collection("request")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data)
        this.setState({ request: data });
      })
  }

  // componentDidMount(snapshot) {
  //   database.collection("request")
  //     .where("status", ">=", "awaiting")
  //     .where("status", "<=", "preparing")
  //     .orderBy("status")
  //     .orderBy("startOrder")
  //     .get()
  //     .then(querySnapshot => {
  //       const data = querySnapshot.docs.map(doc => doc.data());
  //     }
  // }


  // request = () => {
  //   database.collection("request")
  //     .get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map(doc => doc.data());
  //       console.log(data)
  //       this.setState({ request: data });
  //     });
  // database.collection("request").get()
  //   .then(response => {
  //     const order = response.data();
  //     console.log(order)
  //     this.setState({
  //       order,
  //     })
  //   })


  render(props) {
    const requestList = this.state.request;
    console.log(requestList)
    return (
      <Container fluid>
        <div className="div-header-kitchen">
          <div className="div-logo-kitchen">
            <img src={logoBurgerQueen} className="logo-kitchen" alt="logo do Burger Queen, coroa acima do nome" />
          </div>
          <div className="kitchen">
            <p className="welcome-kitchen">Boas Vindas à Cozinha</p>
          </div>
          <div className="div-user-name">
            <FontAwesomeIcon icon={faUserCircle} className="user-name-icon" />
            <p className="name-user">{this.state.name}</p>
          </div>
        </div>
        <div>
          {
            requestList.map((cardItems, index) => {
              return <Card className="card-border" border="danger" key={index} style={{ width: '30rem' }} >
                <Card.Header className="text-align-center">{cardItems.client}</Card.Header>
                <Card.Body>
                  {
                    cardItems.items.map((item, index) => {
                      return <ListGroup key={index} variant="flush">
                        <ListGroup.Item> {item.quantity} - {item.name}</ListGroup.Item>
                      </ListGroup>
                    })
                  }
                </Card.Body>
                <ButtonConfirm className="btn-confirm-kitchen" />
              </Card>
            })
          }
        </div>
      </Container >
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Kitchen);