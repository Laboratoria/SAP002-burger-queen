import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import Icon from './Icon';

function CampoText(props) {
  return (
    <FormGroup className='input-group form-group'>
      <div className='input-group-prepend'>
        <span className='input-group-text'><Icon name={props.icon} /></span>
      </div>
      <Input type={props.type} className='form-control' value={props.value}
        placeholder={props.placeholder} onChange={props.onChange} />
    </FormGroup>
  );
}

export default CampoText;