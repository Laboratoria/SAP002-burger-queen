import React from 'react';
import { Input, Col } from 'reactstrap';

function Radio(props) {
  return (
    <Col>
      <Input type='radio' name={props.name} value={props.value} onChange={props.onChange} />
      {props.text}
    </Col>
  );
}

export default Radio;