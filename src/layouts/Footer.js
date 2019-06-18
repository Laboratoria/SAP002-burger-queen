import React from 'react';
import { Row, Col, CardFooter } from 'reactstrap';
import Button from '../components/Button';

function Footer(props) {
  return (
    <Row>
      <Col>
        <CardFooter className='d-flex justify-content-between'>
          <h5><i className='fas fa-money-check-alt'></i> Total R$ {props.total}</h5>
          <Button text='Enviar' color='warning' icon='fas fa-share-square'
            onClick={props.onClick} />
        </CardFooter>
      </Col>
    </Row>
  );
}

export default Footer;



