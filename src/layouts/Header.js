import React from 'react';
import { Card, CardImg, Row } from 'reactstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Button from '../components/Button';
import capa from '../img/capa.jpg';

function Header(props) {
  return (
    <Card>
      <CardImg src={capa} className='card-img-top' />
      <Row className='d-flex justify-content-center'>
        <h5>Bem vindo(a) {props.name},
          <Link to='/'>
            <Button text='Sair' color='warning' icon='fas fa-sign-out-alt' />
          </Link>
        </h5>
      </Row>
    </Card>
  );
}

export default Header;


