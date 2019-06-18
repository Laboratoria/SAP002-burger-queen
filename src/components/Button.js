import React from 'react';
import { Button } from 'reactstrap';
import Icon from './Icon';

function Botao(props) {
  return (
    <Button color={props.color} className={props.className} onClick={props.onClick}>
      <Icon name={props.icon}></Icon> {props.text}
    </Button>
  );
}

export default Botao;