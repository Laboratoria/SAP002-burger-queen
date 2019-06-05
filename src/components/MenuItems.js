import React from 'react';
import Data from '../data.json';
import Button from '../components/Button';
import '../components/Button.css';
import Button from '../components/Button';
import { faCoffee, faGlassWhiskey, faHamburger, faCertificate, faPlusCircle, faMinusCircle, faShareSquare } from '@fortawesome/free-solid-svg-icons';


class MenuItems extends React.Component {
  render() {
    const total = this.state.pedido.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);

    return (
      <div className='items'>
        {
          Data.menu.breakfast.map(item => {
            return (<Button className='btn item-btn' iconName={faCoffee} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
          })
        }
        {
          Data.menu.hamburgueres.map(item => {
            return (<Button className='btn item-btn' iconName={faHamburger} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
          })
        }
        {
          Data.menu.bebidas.map(item => {
            return (<Button className='btn item-btn' iconName={faGlassWhiskey} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
          })
        }
        {
          Data.menu.acompanhamentos.map(item => {
            return (<Button className='btn item-btn' iconName={faCertificate} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
          })
        }
      </div>
    )
  }
}

export default MenuItems
