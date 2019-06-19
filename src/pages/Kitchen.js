import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Container, Row } from 'reactstrap';
import Header from '../layouts/Header';
import Button from '../components/Button';
import Icon from '../components/Icon';
import firebase from '../firebaseConfig';
import { createBrowserHistory } from 'history';
import moment from 'moment';

const createHistory = createBrowserHistory();
const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cooker: '',
      orders: [],
      prepareds: [],
      startDate: moment()
    };

    firebaseAppAuth.onAuthStateChanged(user => {
      database.collection('users').doc(user.uid).get()
        .then(doc => {
          const cooker = doc.data().name;
          this.setState({ cooker })
        });
    });
  }

  componentDidMount() {
    database.collection('orders').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.setState({ orders: data });
      });
    database.collection('prepareds').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.setState({ prepareds: data });
      });
  }

  clickOk = (id, order) => {
    const hour = this.state.startDate.format('HH:mm:ss');
    const time = parseInt(hour) - parseInt(order.hour);
    let prepared = {
      items: order.items,
      client: order.client,
      table: order.table,
      waiter: order.waiter,
      order: order.hour,
      date: order.date,
      prepared: hour,
      time,
      cooker: this.state.cooker
    };
    database.collection('prepareds').doc(id).set(prepared)
    database.collection('orders').doc(id).delete()
      .then(() => alert('Pedido finalizado!') + createHistory.go(0));

  };

  render() {
    return (
      <Container fluid>
        <Header name={this.state.cooker} />
        <Card>
          <CardHeader>
            <h3><Icon name='fas fa-clipboard-list' /> Fila de espera</h3>
          </CardHeader>
          <Row>
              {this.state.orders.map((order, index) => {
            return <Card key={index} className='card-espera'>
              <CardHeader className='d-flex justify-content-between'>
                Cliente: {order.client} <strong><Icon name='far fa-clock' /> {order.hour}</strong></CardHeader>
              <CardBody>{order.items.map((item, index) => {
                return <p key={index}>{item.quantidade} x {item.nome}</p>
              })} <Button text='Pronto' color='warning' icon='far fa-check-circle'
                onClick={() => this.clickOk(`${order.date}-${order.hour}`, order)} />
              </CardBody>
              <CardFooter><strong>Atendente {order.waiter}</strong> </CardFooter>
            </Card>
          })}
          </Row>
        </Card>
        <Card>
          <CardHeader>
            <h3><Icon name='fas fa-clipboard-check' /> Finalizados</h3>
          </CardHeader>
          <Row>
            {this.state.prepareds.map((prepared, index) => {
              return <Card key={index} className='card-espera'>
                <CardHeader className='d-flex justify-content-between'>
                  Cliente: {prepared.client} <strong><Icon name='far fa-clock' /> {prepared.order}</strong></CardHeader>
                <CardBody>{prepared.items.map((item, index) => {
                  return <p key={index}>{item.quantidade} x {item.nome}</p>
                })} </CardBody>
                <CardFooter><strong>Preparado às {prepared.prepared}</strong></CardFooter>
              </Card>
            })}
          </Row>
        </Card>
      </Container>
    );
  }
}

export default Kitchen

