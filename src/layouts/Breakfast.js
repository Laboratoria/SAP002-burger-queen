import React from 'react';
import { Card, CardHeader, CardFooter, Button, Container, Row, Col, Input } from 'reactstrap';
import AccordionCollapse from 'react-bootstrap/AccordionCollapse';
import AccordionToggle from 'react-bootstrap/AccordionToggle';
import menu from '../menu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Breakfast(props) {
  return (<Container>
    <CardHeader>
      <AccordionToggle as={Link} eventKey="0"><i class="fas fa-coffee"></i> Café da Manhã</AccordionToggle>
    </CardHeader>
    <AccordionCollapse eventKey="0">
      <Container fluid>
                <Row>
          <Col>
            <Card>
              <CardHeader className="d-flex justify-content-center">
                <strong>Sanduíches</strong></CardHeader>
              {menu.breakfast.burgers.map((product, index) => {
                return <p className="d-flex justify-content-around">
                  {product.nome} - R$ {product.preco}
                  <p>
                    <Button key={index} onClick={() => this.clickBuy(product)}
                      color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                  </p>
                </p>
              })}
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader className="d-flex justify-content-around">
                <strong>Bebidas</strong></CardHeader>
              {menu.breakfast.drinks.map((product, index) => {
                return <p className="d-flex justify-content-around">
                  {product.nome} - R$ {product.preco}
                  <Button key={index} onClick={() => this.clickBuy(product)}
                    color="success" className="btn-circle"><i class="fas fa-plus"></i></Button>
                </p>
              })}
            </Card>
          </Col>
        </Row>
      </Container>
    </AccordionCollapse>
  </Container>
  );
}



export default Breakfast;
