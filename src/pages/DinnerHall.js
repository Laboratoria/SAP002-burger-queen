import React from 'react';
import firebase from "../firebaseConfig";
import { Tab, Tabs, Navbar, Col, Row, Container, Card, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from "../components/navBar"
import Menu from "../components/menu"
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      order: [],
      user: ""
    };
  }

  logout() {
    firebase.auth().signOut()
      .then(this.props.history.push(`/`))
  }

  componentDidMount() {
    // event.preventDefault();
    database.collection('login').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  clientOrder = (item) => {
    const itemIndex = this.state.order.findIndex((product) => {
      return product.nome === item.nome;
    });

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      };

      this.setState({
        order: this.state.order.concat(newItem)
      });
    } else {
      let newOrder = this.state.order;
      newOrder[itemIndex].quantity += 1;
      this.setState({
        order: newOrder
      });
    }
  }

  render() {
    const orderTotal = this.state.order.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.preco)
    }, 0);
    return (
      <div className="bg-red div-height">
        <Nav />

        <Container className="">
          <Row>

            <Col className="mr-1 p-0 ">
              <Menu
                clientOrder={this.clientOrder}
              />
            </Col>

            <Col className="ml-1 p-0">
              <Card>
                <Card.Text>
                  <p className="red-text ml-2 mt-4">Pedido</p>
                  <input className="input-border red-text ml-2" type="text" placeholder="Nome do Cliente" />
                </Card.Text>
                <Card.Body>

                  {this.state.order.map((product, i, j, k) => {
                    return (

                      <Table size="sm">

                        <tbody>
                          <tr>
                            <td key={i}>{product.nome} </td>
                            <td key={j}>{product.quantity}</td>
                            <td key={k}>{product.preco * product.quantity},00</td>
                          </tr>
                        </tbody>
                      </Table>
                    )

                  })
                  }
                  <div className="d-flex flex-column">
                    <p className="dark-text ml-2 mt-4 ml-auto">Total: R$ {orderTotal},00</p>
                    <button className="bg-red white-text border border-light rounded p-1">Enviar Pedido</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>

      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
