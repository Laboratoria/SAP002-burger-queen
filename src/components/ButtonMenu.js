import React from 'react';
import './Button.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ButtonMenu(props) {
  return (
    <button className="button buttonMenu" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.iconName} /> {props.text} - R${props.price}
    </button>
  );
}

export default ButtonMenu;
