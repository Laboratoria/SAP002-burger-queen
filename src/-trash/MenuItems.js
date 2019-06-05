import React from 'react';
import Data from '../data.json';
import Saloon from '../pages/saloon';
import '../components/Button.css';
import Button from '../components/Button';
import { faCoffee, faGlassWhiskey, faHamburger, faCertificate, faPlusCircle, faMinusCircle, faShareSquare } from '@fortawesome/free-solid-svg-icons';


class MenuItems extends React.Component {
  render() {
    const total = this.state.order.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);

    return (
      
    )
  }
}

export default MenuItems
