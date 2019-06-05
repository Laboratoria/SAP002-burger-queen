import React from 'react';
import './ButtonMini.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ButtonMini(props) {
  return (
    <button className="button-mini" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.iconName} />
    </button>
  );
}

export default ButtonMini;
