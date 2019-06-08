import React from 'react';
import firebase from '../firebase/firebase-config';

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

  render() {
    const orders = this.state.listItem;

    return (
      <section className='order-list'>
        <p>Vc está na Cozinha</p>
        <h1>Seus Pedidos que já estão na cozinha:</h1>
          {
            orders.map((client) => {
              return (
                <div>
                  <h2>{client.clientName}</h2>
                  {
                    client.order.map(pedido => {
                      return <p>Qtd: {pedido.quantity} - {pedido.title}</p>
                    })
                  }
                </div>
              )
            })
          }
      </section>
    )
  }
}

export default Kitchen
