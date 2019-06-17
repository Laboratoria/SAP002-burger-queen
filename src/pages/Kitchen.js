import React from "react";
import firebase from "../firebaseConfig";
import menu from "./Menu";
import "./InsidePages.css";
import logo from "../assets/logo-white.png";
import { Button, Row, Container, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Lounge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      chef: ""
    };
  }

  componentDidMount() {
    firebaseAppAuth.onAuthStateChanged(user => {
      if (user) {
        database
          .collection("users")
          .where("email", "==", user.email)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            if (data[0].type !== "kitchen") {
              this.props.history.replace("/lounge");
            }
            this.setState({ chef: data[0].name });
          });

        database
          .collection("orders")
          .where("status", ">=", "awaiting")
          .where("status", "<=", "preparing")
          .orderBy("status")
          .orderBy("startOrder")
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());

            let orderItens = [];

            data.forEach(element => {
              console.log(element.itens);
              orderItens.push({
                client: element.client,
                startOrder: element.startOrder.toDate().toString(),
                finishOrder: element.finishOrder
                  ? element.finishOrder.toDate().toString()
                  : "",
                // itens: element.itens,
                status: element.status,
                waiter: element.waiter
              });
            });

            this.setState({ orders: orderItens });
          });
      } else {
        this.props.history.replace("/");
      }
    });
  }

  handleChange = (event, elem) => {
    const newState = this.state;
    newState[elem] = event.target.value;
    this.setState(newState);
  };

  changeOrderStatus = order => {};

  //   submitOrder = () => {
  //     const order = {
  //       client: this.state.client,
  //       itens: this.state.orderItens,
  //       waiter: this.state.waiter,
  //       startOrder: new Date(),
  //       finishOrder: "",
  //       status: "preparation-queue"
  //     };

  //     database
  //       .collection("orders")
  //       .doc()
  //       .set(order)
  //       .then(response => {
  //         this.setState({
  //           client: "",
  //           orderItens: []
  //         });
  //       });
  //   };

  signOut = () => {
    firebaseAppAuth
      .signOut()
      .then(function() {})
      .then(() => {
        this.props.history.replace("/");
      })
      .catch(function(error) {
        console.log("Ops! Aconteceu um erro!");
      });
  };

  render() {
    return (
      <Container fluid>
        <Row className="orange d-flex justify-content-between">
          <Col className="align-self-center text-white pl-4 text-uppercase font-weight-bold">
            {this.state.chef && <span> Olá, {this.state.chef}</span>}
          </Col>
          <Col md={8} className="pl-4 my-2 text-center align-self-center">
            <img src={logo} alt="logo" className="logo-nav" />
          </Col>
          <Col className="text-right align-self-center size-lg">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-white"
              onClick={this.signOut}
            />
          </Col>
        </Row>
        <Row>
          {this.state.orders.map((order, i) => {
            return (
              <Col className="mt-4" md={6} lg={4} key={i}>
                <Card>
                  <Card.Header className="bg-primary text-white font-italic">
                    Cliente: {order.client}
                  </Card.Header>
                  <Card.Text className="mt-1 text-primary text-center">
                    PEDIDOS
                  </Card.Text>
                  <Card.Body>{order.itens}</Card.Body>
                  {/* <Button variant="dark">Go somewhere</Button> */}
                  <Card.Footer className="text-muted">
                    <Row>
                      <Col>00:00</Col>
                      <Col className="text-right font-italic font-weight-bold">
                        {order.waiter}
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Lounge;
