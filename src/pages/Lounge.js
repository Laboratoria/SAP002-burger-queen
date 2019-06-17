import React from "react";
import firebase from "../firebaseConfig";
import menu from "./Menu";
import "./InsidePages.css";
import logo from "../assets/logo-white.png";
import {
  Button,
  Tab,
  Tabs,
  Row,
  Container,
  Col,
  Card,
  Form
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faPlusCircle,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();
const menu_breakfast = menu.breakfast;
const menu_lunch = menu.lunch;

class Lounge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItens: [],
      client: "",
      waiter: ""
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
            if (data[0].type !== "lounge") {
              this.props.history.replace("/kitchen");
            }
            this.setState({ waiter: data[0].name });
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

  submitOrder = () => {
    const order = {
      client: this.state.client,
      itens: this.state.orderItens,
      waiter: this.state.waiter,
      startOrder: new Date(),
      finishOrder: "",
      status: "awaiting"
    };

    database
      .collection("orders")
      .doc()
      .set(order)
      .then(response => {
        this.setState({
          client: "",
          orderItens: []
        });
      });
  };

  orderProduct = product => {
    const prod_index = this.state.orderItens.findIndex(food => {
      return food.item === product.item;
    });
    if (prod_index < 0) {
      const sum = {
        ...product,
        quantity: 1
      };
      this.setState({
        orderItens: this.state.orderItens.concat(sum)
      });
    } else {
      let new_order = this.state.orderItens;
      new_order[prod_index].quantity += 1;
      this.setState({
        orderItens: new_order
      });
    }
  };

  deleteProduct = product => {
    const prod_index = this.state.orderItens.findIndex(food => {
      return food.item === product.item;
    });
    let new_order = this.state.orderItens;
    new_order[prod_index].quantity -= 1;

    const quantity = new_order[prod_index].quantity;

    if (quantity > 0) {
      this.setState({
        orderItens: new_order
      });
    } else {
      new_order.splice(prod_index, 1);
      this.setState({
        orderItens: new_order
      });
    }
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
    const totalAmount = this.state.orderItens.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);

    return (
      <Container fluid>
        <Row className="orange d-flex justify-content-between">
          <Col className="align-self-center text-white pl-4 text-uppercase font-weight-bold">
            {this.state.waiter && <span> Olá, {this.state.waiter}</span>}
          </Col>
          <Col
            md={8}
            className="pl-4 my-2 text-center align-self-center tipewhite"
          >
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

        <Row className="mt-2">
          <Col>
            <Tabs
              className="category-title"
              defaultActiveKey="breakfast"
              id="options-menu"
            >
              <Tab eventKey="breakfast" title="CAFÉ DA MANHÃ">
                <Row className="mt-3 d-flex justify-content-around">
                  {menu_breakfast.map((food, i) => {
                    return (
                      <Col sm={11} className="mb-2" key={i}>
                        <Card>
                          <Card.Body style={{ padding: "0.3rem" }}>
                            <Row>
                              <Col
                                sm={7}
                                className="align-self-center text-muted"
                              >
                                {food.item}
                              </Col>
                              <Col
                                sm={3}
                                className="align-self-center p-0 font-weight-bold text-muted"
                              >
                                R${food.price.toFixed(2)}
                              </Col>
                              <Col sm={1} className="p-0">
                                <FontAwesomeIcon
                                  icon={faPlusCircle}
                                  onClick={() => this.orderProduct(food)}
                                  className="add-ic"
                                />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Tab>
              <Tab eventKey="lunch" title="LANCHES">
                <Row className="mt-3 d-flex justify-content-around">
                  {menu_lunch.map((food, i) => {
                    return (
                      <Col sm={11} className="mb-2" key={i}>
                        <Card>
                          <Card.Body style={{ padding: "0.3rem" }}>
                            <Row>
                              <Col
                                sm={7}
                                className="align-self-center text-muted"
                              >
                                {food.item}
                              </Col>
                              <Col
                                sm={3}
                                className="align-self-center p-0 font-weight-bold text-muted"
                              >
                                R${food.price.toFixed(2)}
                              </Col>
                              <Col sm={1} className="p-0">
                                <FontAwesomeIcon
                                  icon={faPlusCircle}
                                  onClick={() => this.orderProduct(food)}
                                  className="add-ic"
                                />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Tab>
            </Tabs>
          </Col>

          <Col>
            <Card className="text-dark">
              <Card.Header className="del-ic font-weight-bold text-center order-title">
                PEDIDOS
                <Form.Group controlId="clientNames">
                  <Form.Control
                    value={this.state.client}
                    type="text"
                    placeholder="Insira Nome do Cliente"
                    className="text-primary"
                    onChange={e => this.handleChange(e, "client")}
                  />
                </Form.Group>
              </Card.Header>
              <Card.Body>
                {this.state.orderItens.map((food, i) => {
                  return (
                    <Row key={i}>
                      <Col>
                        <Row className="mb-1">
                          <Col md={12} lg={6}>
                            {food.item}
                          </Col>
                          <Col md={1} lg={1}>
                            {food.quantity}
                          </Col>

                          <Col md={8} lg={3} className="font-weight-bold">
                            R${(food.price * food.quantity).toFixed(2)}
                          </Col>
                          <Col md={2} lg={1}>
                            <FontAwesomeIcon
                              icon={faMinusCircle}
                              className="del-ic"
                              onClick={() => this.deleteProduct(food)}
                            />
                          </Col>

                          <Col sm={12}>
                            <hr />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
              </Card.Body>
              <Card.Footer className="font-weight-bold bg-dark text-white text-center">
                TOTAL R${totalAmount.toFixed(2)}
              </Card.Footer>
              <Card.Footer>
                {" "}
                <Button
                  className="btn-block"
                  onClick={this.submitOrder}
                  disabled={
                    this.state.orderItens.length === 0 ||
                    this.state.client === ""
                      ? true
                      : false
                  }
                >
                  Enviar
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lounge;
