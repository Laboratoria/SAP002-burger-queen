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
          // .where("status", "<=", "preparing")
          .orderBy("status")
          .orderBy("startOrder")
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log("data", data);

            let orderItens = [];

            data.map(element => {
              console.log(element.itens);
              orderItens.push({
                client: element.client,
                startOrder: element.startOrder.toDate().toString(),
                finishOrder: element.finishOrder
                  ? element.finishOrder.toDate().toString()
                  : "",
                itens: element.itens,
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

  changeOrderStatus = (order, index) => {
    const newState = this.state.orders;
    console.log("newState", newState);

    if (order.status === "awaiting") {
      order.status = "preparing";
    } else if (order.status === "preparing") {
      order.status = "done";
    }
    newState[index] = order;

    this.setState({
      orders: newState
    });
  };

  getButtonName = status => {
    if (status === "awaiting") return "Aguardando";
    else if (status === "preparing") return "Em preparação";
    else if (status === "done") return "Pronto";
  };

  getButtonColor = status => {
    if (status === "awaiting") return "secondary";
    else if (status === "preparing") return "warning";
    else if (status === "done") return "success";
  };

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
              <Col className="mt-4" md={4} lg={3} key={i}>
                <Card>
                  <Card.Header className="bg-primary text-white font-italic">
                    Cliente: {order.client.toUpperCase()}
                  </Card.Header>
                  <Card.Text className="mt-2 text-primary text-center">
                    PEDIDOS
                  </Card.Text>
                  {order.itens.map((food, i) => {
                    return (
                      <Card.Body className="py-0" key={i}>
                        <Row>
                          <Col sm={1} className="font-weight-bold">
                            {food.quantity}
                          </Col>
                          <Col className="pr-0">{food.item}</Col>
                        </Row>
                      </Card.Body>
                    );
                  })}
                  <Button
                    className="mt-1"
                    variant={this.getButtonColor(order.status)}
                    onClick={() => this.changeOrderStatus(order, i)}
                    key={i}
                  >
                    {this.getButtonName(order.status)}
                  </Button>

                  <Card.Footer className="mt-0 blue-neutral text-muted">
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
