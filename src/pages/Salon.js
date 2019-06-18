import React from 'react';
import { Card, CardHeader, CardFooter, Button, Container, Row, Col, Input } from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion';
import AccordionCollapse from 'react-bootstrap/AccordionCollapse';
import AccordionToggle from 'react-bootstrap/AccordionToggle';
import menu from '../menu';
import capa from '../img/capa_face.jpg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from '../firebaseConfig';

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Salon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: [],
      client: '',
      table: '',
      waiter: ''
    };

    firebaseAppAuth.onAuthStateChanged(user => {
      database.collection("users").doc(user.uid).get()
        .then(doc => {
          const waiter = doc.data().name;
          this.setState({ waiter })
        });
    });
  }

  handleChangeClient = (event) => {
    this.setState({ client: event.target.value })
  };

  handleChangeTable = (event) => {
    this.setState({ table: event.target.value })
  };

  clickBuy = (item) => {
    const itemIndex = this.state.buy.findIndex((product) => {
      return product.nome === item.nome;
    });
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantidade: 1
      };
      this.setState({
        buy: this.state.buy.concat(newItem)
      });
    } else {
      let changeQuantity = this.state.buy;
      changeQuantity[itemIndex].quantidade += 1;
      this.setState({
        buy: changeQuantity
      });
    };
  };

  clickDelete = (item) => {
    const itemIndex = this.state.buy.findIndex((product) => {
      return product.nome === item.nome;
    });
    let changeQuantity = this.state.buy;
    changeQuantity[itemIndex].quantidade -= 1;
    const quantity = changeQuantity[itemIndex].quantidade;
    if (quantity > 0) {
      this.setState({
        buy: changeQuantity
      });
    } else {
      changeQuantity.splice(itemIndex, 1);
      this.setState({
        buy: changeQuantity
      });
    }
  };

  clickSubmit = () => {
    if (this.state.client === "" || this.state.table === "") {
      alert('Por favor, digite o nome e a mesa do cliente.');
    } else if (this.state.buy.length === 0) {
      alert('Por favor, insira os itens do pedido.');
    } else {
      const now = new Date;
      const hour = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
      let order = {
        items: this.state.buy,
        client: this.state.client,
        table: this.state.table,
        waiter: this.state.waiter,
        hour: hour,
        date: date
      };
      database.collection('orders').doc(`${date}-${hour}`).set(order)
        .then(() => alert('Pedido feito!'));
      this.setState({
        buy: [],
        client: '',
        table: ''
      });
    }
  };

  render() {
    const total = this.state.buy.reduce((accumulator, current) => {
      return accumulator + current.quantidade * current.preco
    }, 0)

    return (
      <Container fluid>
        <Card style={{ width: '80rem' }}>
          <img src={capa} className="card-img-top" ></img>
          <Row className="d-flex justify-content-center">
            <h5>Bem vindo(a) {this.state.waiter}, <Link to="/"><Button color="warning"
              onClick={this.clickSignOut}><i class="fas fa-sign-out-alt"></i> Sair</Button></Link></h5>
          </Row>
          <Row>
            <Col>
              <Accordion>
                <Card style={{ width: '40rem' }}>
                  <CardHeader>
                    <h3><i className='fas fa-utensils'></i> Cardápio</h3>
                  </CardHeader>
                  <CardHeader>
                    <AccordionToggle as={Link} eventKey="0"><i class="fas fa-coffee"></i> Café da Manhã</AccordionToggle>
                  </CardHeader>
                  <AccordionCollapse eventKey="0">
                    <Container fluid>
                      <Row>
                        <Col>
                          <Card>
                            <CardHeader className="d-flex justify-content-center">
                              <strong>Sanduíches</strong></CardHeader>
                            {menu.breakfast.burgers.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <p>
                                  <Button key={index} onClick={() => this.clickBuy(product)}
                                    color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                                </p>
                              </p>})}
                          </Card>
                        </Col>
                        <Col>
                          <Card>
                            <CardHeader className="d-flex justify-content-around">
                              <strong>Bebidas</strong></CardHeader>
                            {menu.breakfast.drinks.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <Button key={index} onClick={() => this.clickBuy(product)}
                                  color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                              </p>})}
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </AccordionCollapse>
                  <CardHeader>
                    <AccordionToggle as={Link} eventKey="1"><i class="fas fa-hamburger"></i> Hambúrgueres</AccordionToggle>
                  </CardHeader>
                  <AccordionCollapse eventKey="1">
                    <Container fluid>
                      <Row>
                        <Col>
                          <Card>
                            <CardHeader className="d-flex justify-content-center">
                              <strong>Simples</strong></CardHeader>
                            {menu.burgers.simple.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <Button key={index} onClick={() => this.clickBuy(product)}
                                  color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                              </p>})}
                          </Card>
                        </Col>
                        <Col>
                          <Card>
                            <CardHeader className="d-flex justify-content-around">
                              <strong>Duplo</strong></CardHeader>
                            {menu.burgers.double.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <Button key={index} onClick={() => this.clickBuy(product)}
                                  color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                              </p>})}
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </AccordionCollapse>
                  <CardHeader>
                    <AccordionToggle as={Link} eventKey="2"><i class="fas fa-cookie-bite"></i> Acompanhamentos</AccordionToggle>
                  </CardHeader>
                  <AccordionCollapse eventKey="2">
                    <Container fluid>
                      <Row>
                        <Col>
                          <Card>
                            {menu.accompaniments.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <Button key={index} onClick={() => this.clickBuy(product)}
                                  color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                              </p>})}
                          </Card>
                        </Col>
                        <Col></Col>
                      </Row>
                    </Container>
                  </AccordionCollapse>
                  <CardHeader>
                    <AccordionToggle as={Link} eventKey="3"><i class="fas fa-glass-cheers"></i> Bebidas</AccordionToggle>
                  </CardHeader>
                  <AccordionCollapse eventKey="3">
                    <Container fluid>
                      <Row>
                        <Col>
                          <Card>
                            <CardHeader className="d-flex justify-content-center">
                              <strong>Água</strong></CardHeader>
                            {menu.drinks.watter.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <Button key={index} onClick={() => this.clickBuy(product)}
                                  color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                              </p>})}
                          </Card>
                        </Col>
                        <Col>
                          <Card>
                            <CardHeader className="d-flex justify-content-center">
                              <strong>Refrigerante</strong></CardHeader>
                            {menu.drinks.soda.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <Button key={index} onClick={() => this.clickBuy(product)}
                                  color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                              </p>})}
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </AccordionCollapse>
                  <CardHeader>
                    <AccordionToggle as={Link} eventKey="4"><i class="far fa-plus-square"></i> Adicionais</AccordionToggle>
                  </CardHeader>
                  <AccordionCollapse eventKey="4">
                    <Container fluid>
                      <Row>
                        <Col>
                          <Card>
                            {menu.adds.map((product, index) => {
                              return <p className="d-flex justify-content-around">
                                {product.salao} - R$ {product.preco}
                                <Button key={index} onClick={() => this.clickBuy(product)}
                                  color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                              </p>})}
                          </Card>
                        </Col>
                        <Col></Col>
                      </Row>
                    </Container>
                  </AccordionCollapse>
                  <Row>
                  </Row>
                </Card>
              </Accordion>
            </Col>
            <Col>
              <Card style={{ width: '35rem ' }}>
                <CardHeader>
                  <h3><i class="fas fa-shopping-cart"></i> Pedido</h3>
                </CardHeader>
                <Row>
                  <Col>
                    <Col>
                      <div className='input-group form-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'><i className='fas fa-user-edit'></i></span>
                        </div>
                        <Input type='text' className='form-control' value={this.state.client}
                          placeholder='Nome do cliente' onChange={this.handleChangeClient} />
                        <div className='input-group-prepend'>
                          <span className='input-group-text'><i className='fas fa-clipboard'></i></span>
                        </div>
                        <Input type='number' className='form-control' value={this.state.table}
                          placeholder='Digite a mesa' onChange={this.handleChangeTable} />
                      </div>
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card style={{ width: '33rem ' }}>
                      <CardHeader><strong>Itens</strong></CardHeader>
                      {this.state.buy.map((product, index) => {
                        return <Col key={index} className="d-flex justify-content-between">
                          <strong>{product.nome}</strong>
                          R$ {product.preco * product.quantidade}
                          <p><Button onClick={() => this.clickDelete(product)}
                            className="btn-circle" color="danger"><i class="fas fa-minus"></i></Button>
                            <Button color="default">{product.quantidade} </Button>
                            <Button onClick={() => this.clickBuy(product)}
                              className="btn-circle" color="success"><i class="fas fa-plus"></i></Button></p>
                        </Col>})}
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CardFooter className="d-flex justify-content-between">
                      <h5><i class="fas fa-money-check-alt"></i> Total R$ {total}</h5>
                      <Button color="warning" onClick={this.clickSubmit}><i class="fas fa-share-square"></i> Enviar</Button>
                    </CardFooter>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    )
  }
}

export default Salon
