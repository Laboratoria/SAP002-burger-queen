import React from 'react';
import firebase from "../firebaseConfig";
import { Tab, Tabs, Navbar, Col, Button, Row, Container, Card } from 'react-bootstrap';
import logo from "../assets/img/logo-small.png"
import 'bootstrap/dist/css/bootstrap.css';
import breakfastMenu from "../components/breakfastMenu"
import regularMenu from "../components/regularMenu"
import withFirebaseAuth from 'react-with-firebase-auth';


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      user: ""
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
              <span className="ml-5 red-text">Olá, {}</span>
            </Navbar.Brand>
            <button  onClick={this.logout} className="red-text py-1 px-2 ml-auto btn-border">Sair</button>
          </Navbar>
        </div>
        <Container className="">
          <Row>

            <Col className="mr-1 p-0 ">
              <Card className="red-text" >
                <Card.Body>


                  <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" bsClass="red-text" className="mb-3 red-text">
                    <Tab bsClass="red-text" eventKey="home" title="Café da Manhã">
                      {breakfastMenu.map((product, i) => {
                        return (
                          
                          <Card className="m-1 d-inline-flex">
                          <Card.Body className="d-flex flex-column ">

                            <img src={product.foto} alt="Logo" className="img-size" />

                            <Card.Text className="d-flex flex-column dark-text text-center text-small">
                              <span className="">{product.nome}</span>
                              <span className=""> R$ {product.preco},00 </span>
                              </Card.Text>
                                <div className="d-flex">
                              <button className="mx-1 border-sucess icon-border bg-white" key={i} onClick={() => this.clientOrder(product)}><i class="fas fa-plus"></i></button>
                              <button className="mx-1 icon-border bg-white" key={i} onClick={() => this.clientOrder(product)}><i class="fas fa-minus"></i></button>
                              </div>
                          </Card.Body>
                        </Card>

                        )
                      })
                      }
                    </Tab>
                    <Tab className="red-text" eventKey="profile" title="Almoço/Jantar">

                      {regularMenu.map((product, i) => {
                        return (

                          <Card className="m-1 d-inline-flex ">
                            <Card.Body className="d-flex flex-column">

                              <img src={product.foto} alt="Logo" className="img-size" />

                              <Card.Text className="d-flex flex-column dark-text text-center text-small">
                                <span className="">{product.nome}</span>
                                <span className=""> R$ {product.preco},00 </span>
                                </Card.Text>
                                  <div className="d-flex flex-row">
                                <button className="bg-white btn-border" key={i} onClick={() => this.clientOrder(product)}><i class="fas fa-plus"></i></button>
                                <button className="bg-white btn-border" key={i} onClick={() => this.clientOrder(product)}><i class="fas fa-minus"></i></button>
                                </div>
                            </Card.Body>
                          </Card>

                        )
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
                  <input className="input-border red-text" type="text" placeholder="Nome do Cliente"></input>
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
