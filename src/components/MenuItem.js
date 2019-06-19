import React from 'react';
import './Menu.css';

function MenuItem(props) {
  return (
    <div className="col-2 m-2 p-2 Menu-item " onClick={props.onClick}>
      <p className="text-center">{props.name}</p>
      <figure className="w-75 mx-auto">
        <img className="w-100 " src={props.imgUrl} alt=""></img>
      </figure>
      <p className="text-center p-0">{'R$' + props.price.toFixed(2)}</p>
    </div>
  )
}

export default MenuItem;
