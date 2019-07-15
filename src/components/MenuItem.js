import React from 'react';
import './Menu.css';

function MenuItem(props) {
  return (
    <div className="MenuItem" onClick={props.onClick}>
      <p className="MenuItem-name">{props.name}</p>
      <figure className="MenuItem-figure">
        <img className="MenuItem-image" src={props.imgUrl} alt=""></img>
      </figure>
      <p className="MenuItem-price">{'R$' + props.price.toFixed(2)}</p>
    </div>
  )
}

export default MenuItem;
