import React from 'react';
import firebase from "../firebaseConfig";
import { Tab, Tabs, Navbar, Col, Button, Row, Container, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Ativo1 from "../assets/img/Ativo1"
const database = firebase.firestore();

const breakfastMenu = [
  {
    nome: "Café americano",
    preco: 5.00
    foto: "../"
  },
  {
    nome: "Café com leite",
    preco: 7.00
  },
  {
    nome: "Sanduíche de presunto e queijo",
    preco: 10.00
  },
  {
    nome: "Suco de fruta natural",
    preco: 7.00
  }
];

const regularMenu = [
  {
    nome: "Hambúrguer simples",
    preco: 10.00
  },
  {
    nome: "Hambúrguer duplo",
    preco: 15.00
  },
  {
    nome: "Batata frita",
    preco: 5.00
  },
  {
    nome: "Anéis de cebola",
    preco: 5.00
  },
  {
    nome: "Água 500 ml",
    preco: 5.00
  },
  {
    nome: "Água 750 ml",
    preco: 7.00
  },
  {
    nome: "Bebida gaseificada 500 ml",
    preco: 7.00
  },
  {
    nome: "Bebida gaseificada 750 ml",
    preco: 10.00
  },
  {
    nome: "Ovo",
    preco: 1.00
  },
  {
    nome: "Queijo",
    preco: 1.00
  },
];

class App extends React.Component {

  componentDidMount() {
    // event.preventDefault();
    database.collection('login').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  render() {
    return (
      <div className="">

        <Navbar bg="light" expand="lg" className="mb-5">
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Button variant="outline-success">Sair</Button>
        </Navbar>

        <Container >
          <Row>

            <Col className="mr-1 p-0">
              <Card>
                <Card.Body>
                  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="Café da Manhã">
                    {breakfastMenu.map(product => {
                      return <button>{product.nome}</button>
                    })
                  }
                    </Tab>
                    <Tab eventKey="profile" title="Almoço/Jantar">
                      <p>almoço e jantar</p>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>

            <Col className="ml-1 p-0">
              <Card>
                <Card.Body>
                  <p>Pedido</p>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>

      </div>
    );
  }
}

export default (App);