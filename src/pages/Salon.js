import React from 'react';
import { Card, CardHeader, Container, Row, Col } from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import TwoMaps from '../layouts/TwoMaps';
import OneMap from '../layouts/OneMap';
import Button from '../components/Button';
import Input from '../components/Input';
import Icon from '../components/Icon';
import menu from '../menu';
import firebase from '../firebaseConfig';
import { createBrowserHistory } from 'history';

const createHistory = createBrowserHistory();
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
      database.collection('users').doc(user.uid).get()
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
    if (this.state.client === '' || this.state.table === '') {
      alert('Por favor, digite o nome e a mesa do cliente.');
    } else if (this.state.buy.length === 0) {
      alert('Por favor, insira os itens do pedido.');
    } else {
      const now = new Date();
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
        .then(() => alert('Pedido feito!') + createHistory.go(0));
    }
  };

  render() {
    const total = this.state.buy.reduce((accumulator, current) => {
      return accumulator + current.quantidade * current.preco
    }, 0)

    return (
      <Container fluid>
        <Header name={this.state.waiter} />
        <Row>
          <Col>
            <Accordion>
              <Card className='card-cardapio'>
                <CardHeader>
                  <h3><Icon name='fas fa-utensils'></Icon> Cardápio</h3>
                </CardHeader>
                <TwoMaps eventKey='0' icon='fas fa-coffee' title='Café da Manhã'
                  product1='Sanduíches' map1={menu.breakfast.burgers.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })}
                  product2='Bebidas' map2={menu.breakfast.drinks.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })} />
                <TwoMaps eventKey='1' icon='fas fa-hamburger' title='Hambúrgueres'
                  product1='Simples' map1={menu.burgers.simple.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })}
                  product2='Duplo' map2={menu.burgers.double.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })} />
                <OneMap eventKey='2' icon='fas fa-cookie-bite' title='Acompanhamentos'
                  map={menu.accompaniments.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })} />
                <TwoMaps eventKey='3' icon='fas fa-glass-cheers' title='Bebidas'
                  product1='Água' map1={menu.drinks.watter.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })}
                  product2='Refrigerante' map2={menu.drinks.soda.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })} />
                <OneMap eventKey='4' icon='far fa-plus-square' title='Adicionais'
                  map={menu.adds.map((product, index) => {
                    return <p key={index} className='d-flex justify-content-around'>
                      {product.salao} - R$ {product.preco}
                      <Button color='success' className='btn-circle' icon='fas fa-plus'
                        onClick={() => this.clickBuy(product)} />
                    </p>
                  })} />
              </Card>
            </Accordion>
          </Col>
          <Col>
            <Card className='card-pedido'>
              <CardHeader>
                <h3><Icon name='fas fa-shopping-cart' /> Pedido</h3>
              </CardHeader>
              <Row>
                <Col><Input type='text' icon='fas fa-user-edit' value={this.state.client}
                  placeholder='Nome do cliente' onChange={this.handleChangeClient} /></Col>
                <Col><Input type='number' icon='fas fa-clipboard' value={this.state.table}
                  placeholder='Digite a mesa' onChange={this.handleChangeTable} /></Col>
              </Row>
              <Row>
                <Col>
                  <CardHeader><strong>Itens</strong></CardHeader>
                  {this.state.buy.map((product, index) => {
                    return <Col key={index} className='d-flex justify-content-between'>
                      <strong>{product.nome}</strong>
                      R$ {product.preco * product.quantidade}
                      <p><Button key={index} color='danger' className='btn-circle' icon='fas fa-minus'
                        onClick={() => this.clickDelete(product)} />
                        <Button text={product.quantidade} color='default' />
                        <Button color='success' className='btn-circle' icon='fas fa-plus'
                          onClick={() => this.clickBuy(product)} /></p>
                    </Col>
                  })}
                </Col>
              </Row>
              <Footer total={total} onClick={this.clickSubmit} />
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Salon
