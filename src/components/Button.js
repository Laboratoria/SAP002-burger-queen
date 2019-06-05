import React from 'react';
import './Button.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      <FontAwesomeIcon icon={props.iconName} /> {props.text} {props.price}
    </button>
  );
}

export default Button;
