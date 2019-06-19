import React from 'react';
import ButtonConfirm from './Button';
import './Saloon.css';
import products from './Menu.json'
import logoBurgerQueen from '../assets/logo-burger-queen.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, Row, Col, Container, ListGroup, Tabs, Tab } from 'react-bootstrap';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: [],
      name: "",
      client: ""
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

  productAdd = (item) => {
    const itemIndex = this.state.buy.findIndex((product) => {
      return product.name === item.name;
    });

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      };
      this.setState({
        buy: this.state.buy.concat(newItem)
      });
    } else {
      let newBuy = this.state.buy;
      newBuy[itemIndex].quantity += 1;
      this.setState({
        buy: newBuy
      });
    }
  }

  productDelete = (item) => {
    const itemIndex = this.state.buy.findIndex((product) => {
      return product.name === item.name;
    });

    let newBuy = this.state.buy;
    newBuy[itemIndex].quantity -= 1;
    const quantity = newBuy[itemIndex].quantity;

    if (quantity > 0) {
      this.setState({
        buy: newBuy
      });
    } else {
      newBuy.splice(itemIndex, 1);
      this.setState({
        buy: newBuy
      });
    }
  }

  confirmBuy = () => {
    if (this.refs.client.value === "") {
      alert("Insira o nome do Cliente");
    } else {
      const object = {
        items: this.state.buy,
        client: this.state.client,
        attendant: this.state.name,
        createdTime: this.timeConfirmBuy(),
        timeDone: "",
        // created: Date.now()
      }
      database.collection("request").add(object)
      this.setState({
        client: "",
        buy: []
      })
      alert("Pedido Enviado à Cozinha com Sucesso");
    }
  }

  saveClient = (event, element) => {
    const newState = this.state;
    console.log(newState)
    newState[element] = event.target.value
    this.setState(newState);
  }

  timeConfirmBuy = () => {
    const time = Date().split(' ')[4];
    return time
  }

  signOut = () => {
    firebaseAppAuth.signOut()
      .then(() => {
        this.props.history.push(`/`)
      }).catch((error) => {
        alert(this.props.error)
      });
  }

  render(props) {
    const total = this.state.buy.reduce((acc, curr) => {
      return acc + (curr.quantity * curr.price)
    }, 0);

    return (
      <div className="div-header">
        <Container>
          <Col xs={6} md={6} lg={12} >
            <div className="div-header-saloon">
              <div className="div-logo-saloon">
                <img src={logoBurgerQueen} className="logo-saloon" alt="logo do Burger Queen, coroa acima do nome" />
              </div>
              <div className="client-name-input">
                <Form>
                  <Row>
                    <Col sm={8}>
                      <Form.Group as={Col} className="form-client-name" controlId="formHorizontalName">
                        <Form.Control ref="client" type="text" placeholder="Nome do Cliente" value={this.state.client}
                          onChange={(event) => this.saveClient(event, "client")} />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="div-user-name">
                <FontAwesomeIcon icon={faUserCircle} className="user-name-icon" />
                <p className="name-user">{this.state.name}</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faSignOutAlt} onClick={() => this.signOut()} className="logout-icon" />
                <p className="out">Sair</p>
              </div>
            </div>
            <div className="div-itens" >
              <div className="tabs-saloon">
                <Tabs defaultActiveKey="breakfast" transition={false} id="noanim-tab-example" className="tabs">
                  <Tab eventKey="breakfast" title="Café da Manhã" className="tab-content-saloon">
                    <div list-saloon>
                      <ListGroup>
                        <Row>
                          <Col sm={8}>
                            <ListGroup.Item disabled>Item</ListGroup.Item>
                          </Col>
                          <Col sm={4}>
                            <ListGroup.Item disabled>Preço R$ </ListGroup.Item>
                          </Col>
                        </Row>
                        <div className="return-item">
                          {
                            products.map((product, index) => {
                              if (product.type === "breakfast") {
                                return <ListGroup>
                                  <Row>
                                    <Col sm={8}>
                                      <ListGroup.Item
                                        key={index}>
                                        <FontAwesomeIcon
                                          icon={faPlusCircle}
                                          onClick={() => this.productAdd(product)}
                                        /> {product.name}</ListGroup.Item>
                                    </Col>
                                    <Col sm={4}>
                                      <ListGroup.Item>R$ {product.price.toFixed(2)}</ListGroup.Item>
                                    </Col>
                                  </Row>
                                </ListGroup>
                              }
                            })
                          }
                        </div>
                      </ListGroup>
                    </div>
                  </Tab>
                  <Tab eventKey="lunches" title="Lanches e Bebidas" className="tab-content-saloon">
                    <ListGroup>
                      <Row>
                        <Col sm={8}>
                          <ListGroup.Item disabled>Item</ListGroup.Item>
                        </Col>
                        <Col sm={4}>
                          <ListGroup.Item disabled>Preço R$</ListGroup.Item>
                        </Col>
                      </Row>
                      <div className="return-item">
                        {
                          products.map((product, index) => {
                            if (product.type === "lunch" && product.burger !== true) {
                              return <ListGroup>
                                <Row>
                                  <Col sm={8}>
                                    <ListGroup.Item key={index} >
                                      <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        onClick={() => this.productAdd(product)}
                                      /> {product.name}
                                    </ListGroup.Item>
                                  </Col>
                                  <Col sm={4}>
                                    <ListGroup.Item>{product.price}</ListGroup.Item>
                                  </Col>
                                </Row>
                              </ListGroup>
                            } else if (product.type === "lunch" && product.burger === true) {
                              return <ListGroup>
                                <Row>
                                  <Col sm={8}>
                                    <ListGroup.Item> {product.name}
                                    </ListGroup.Item>
                                    {
                                      product.flavors.map((flavor, index) => {
                                        return <ListGroup.Item key={index} ><FontAwesomeIcon
                                          icon={faPlusCircle}
                                          onClick={() => this.productAdd(flavor)}
                                        />{flavor.name}</ListGroup.Item>
                                      })
                                    }
                                    {
                                      product.extras.map((extra, index) => {
                                        return <ListGroup.Item key={index} ><FontAwesomeIcon
                                          icon={faPlusCircle}
                                          onClick={() => this.productAdd(extra)}
                                        />{extra.name}</ListGroup.Item>
                                      })
                                    }
                                  </Col>
                                  <Col sm={4}>
                                    <ListGroup.Item>R$ {product.price.toFixed(2)}</ListGroup.Item>
                                  </Col>
                                </Row>
                              </ListGroup>
                            }
                          })
                        }
                      </div>
                    </ListGroup>
                  </Tab>
                </Tabs>
              </div>
              <div className="list-itens">
                <ListGroup>
                  <ListGroup.Item className="header-item-checked" disabled>Pedido(s)</ListGroup.Item>
                </ListGroup>
                {
                  this.state.buy.map((product, index) => {
                    if (product.burger !== true) {
                      return <ListGroup>
                        <ListGroup.Item key={index} ><FontAwesomeIcon
                          icon={faMinusCircle}
                          onClick={() => this.productDelete(product)}
                        />{product.quantity} - {product.name} - {product.price * product.quantity}</ListGroup.Item>
                      </ListGroup>
                    }
                  })
                }
                <ListGroup>
                  <ListGroup.Item className="item-checked" disabled>Total a Pagar</ListGroup.Item>
                  <ListGroup.Item className="item-checked">R$ {total}</ListGroup.Item>
                </ListGroup>
                <ListGroup>
                  <ListGroup.Item className="item-checked" disabled>Nome do(a) Cliente: {this.state.client}</ListGroup.Item>
                </ListGroup>
                <Col xs={6} md={6} lg={12} className="justify-content-md-center btn-col">
                  <ButtonConfirm className="justify-content-md-center btn-confirm" text="Confirmar Pedido(s)" onClick={this.confirmBuy} />
                </Col>
              </div>
            </div>
          </Col>
        </Container>
      </div >
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Saloon);
