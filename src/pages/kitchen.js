import React from 'react';
import firebase from '../firebase/firebase-config';
import Button from '../components/Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const database = firebase.firestore();


class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      order: []
    }
  }

  componentDidMount() {
    database.collection('Orders').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  handleClick = (order) => {
    const object = {
      clientName: this.state.clientName,
      order: order
    }
    database.collection('Orders').add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
  }

  handleDelete = (item) => {
    // database.collection('Orders').doc(item).delete();
  };

  render() {
    const orders = this.state.listItem;

    return (
      <section className='order-list'>
        <p>Vc está na Cozinha</p>
        <h1>Seus Pedidos que já estão na cozinha:</h1>
        {
          orders.map((client, index) => {
            return (
              <div>
                <h2>Pedido {index + 1} - Cliente: {client.clientName}</h2>
                {
                  client.order.map((pedido) => {
                    return <p>Qtd: {pedido.quantity} - {pedido.title}</p>
                  })
                }
                <Button className='plus-minus-btn' iconName={faCheckCircle} onClick={() => this.handleDelete(client)}></Button>
                <hr />
              </div>
            )
          })
        }
      </section>
    )
  }
}

export default Kitchen
