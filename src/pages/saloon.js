import React from 'react';
import firebase from '../firebase-config';
import '../components/Button.css';
import ButtonMenu from '../components/ButtonMenu';
import Button from '../components/Button';
import Data from '../data';
import { faCoffee, faGlassWhiskey, faHamburger, faCertificate } from '@fortawesome/free-solid-svg-icons';
// import { userInfo } from 'os';

const database = firebase.firestore();

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      pedido: []
    }
  }

  componentDidMount() {
    database.collection('Pedidos').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    const object = {
      clientName: this.state.clientName,
      pedido: {}
    }
    database.collection('Pedidos').add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
  }

  handleAdd = () => {
    console.log('clique');
    // this.text, this.price
    // this.state.pedido.concat()
  }

  render() {
    return (
      <div>
        <p>Olá, você está no Salão</p>
        <div className='items'>
          {
            Data.menu.breakfast.map(item => {
              return (<ButtonMenu iconName={faCoffee} text={item.title} price={item.price} key={item.id} onClick=''></ButtonMenu>)
            })
          }
          {
            Data.menu.hamburgueres.map(item => {
              return (<ButtonMenu iconName={faHamburger} text={item.title} price={item.price} key={item.id}></ButtonMenu>)
            })
          }
          {
            Data.menu.bebidas.map(item => {
              return (<ButtonMenu iconName={faGlassWhiskey} text={item.title} price={item.price} key={item.id}></ButtonMenu>)
            })
          }
          {
            Data.menu.acompanhamentos.map(item => {
              return (<ButtonMenu iconName={faCertificate} text={item.title} price={item.price} key={item.id}></ButtonMenu>)
            })
          }
          <div>
            <h1>Pedido</h1>
            <input value={this.state.clientName}
              placeholder="clientName"
              onChange={(e) => this.handleChange(e, "clientName")} />
            <Button text="Salvar pedido" onClick={this.handleClick} />
            {
              this.state.listItem.map((item, index) => {
                return <p key={index}>{item.clientName}</p>
              })
            }
          </div>
        </div>
      </div>




    )
  }

}

export default Saloon
