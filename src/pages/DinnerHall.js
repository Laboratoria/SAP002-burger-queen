import React from 'react';
import firebase from "../firebaseConfig";
import { Tab, Tabs, Navbar, Col, Button, Row, Container, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import logo from "../assets/img/logo-small.png"
import 'bootstrap/dist/css/bootstrap.css';

const database = firebase.firestore();

const breakfastMenu = [
  {
    nome: "Café americano",
    preco: 5.00,
    foto: "https://.com/loraineamaral/burger-queen/blob/master/src/assets/img/cafe-americano.png"
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
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
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

    console.log(item)
  }

  render() {
    console.log(this.state.order)
    return (
      <div className="bg-red div-height">
        <div className="bg-white">
          <Navbar variant="outline-light" expand="lg" className="mb-5 border">
            <Navbar.Brand href="#home">
              <img src={logo} alt="Logo" className="w-50" />
            </Navbar.Brand>
            <Button variant="outline-danger" className="bg-red red-text ml-auto">Sair</Button>
          </Navbar>
        </div>
        <Container className="">
          <Row>

            <Col className="mr-1 p-0 ">
              <Card className="red-text" >
                <Card.Body>


                  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" bsClass="red-text" className="mb-3 red-text">
                    <Tab className="red-text" eventKey="home" title="Café da Manhã">
                      
                      {breakfastMenu.map((product, i) => {
                        return <button key={i} className="d-flex flex-column" onClick={() => this.clientOrder(product)}
                        >{product.nome}</button>
                      })
                      }
                    </Tab>
                    <Tab className="red-text" eventKey="profile" title="Almoço/Jantar">
                      {regularMenu.map((product, i) => {
                        return <button key={i} className="d-flex flex-column">{product.nome}</button>
                      })
                      }
                    </Tab>
                  </Tabs>

                </Card.Body>
              </Card>
            </Col>

            <Col className="ml-1 p-0">
              <Card>
                <Card.Body>
                  <p className="red-text">Pedido</p>
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