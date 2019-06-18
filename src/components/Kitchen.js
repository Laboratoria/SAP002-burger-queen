import React from 'react';
import ButtonConfirm from './Button';
import timer from './Timer';
import './Kitchen.css';
import logoBurgerQueen from '../assets/logo-burger-queen.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, ListGroup, Card, Row } from 'react-bootstrap';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      client: "",
      request: [],
      seconds: 0
    };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
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
        this.setState({
          request: data,
          seconds: 0
        });
      })
      .then(() => {
        this.interval = setInterval(() => this.tick(), 1000);
      });

    // this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        <div className="list-items-kitchen">
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
                <Row>
                  <Col sm={8} className="justify-content-md-center btn-confirm-kitchen">
                    <ButtonConfirm className="justify-content-md-center" text="Feito" onClick={this.confirmDone} />
                  </Col>
                  <Col sm={4}>
                    <p>{this.state.seconds}</p>
                  </Col>
                </Row>
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