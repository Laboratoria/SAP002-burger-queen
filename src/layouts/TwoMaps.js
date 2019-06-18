import React from 'react';
import { Card, CardHeader, Container, Row, Col } from 'reactstrap';
import AccordionCollapse from 'react-bootstrap/AccordionCollapse';
import AccordionToggle from 'react-bootstrap/AccordionToggle';
import Link from 'react-bootstrap/NavLink';
import Icon from '../components/Icon';

function TwoMaps(props) {
  return (<div>
    <CardHeader>
      <AccordionToggle as={Link} eventKey={props.eventKey}>
        <Icon name={props.icon} /> {props.title}
      </AccordionToggle>
    </CardHeader>
    <AccordionCollapse eventKey={props.eventKey}>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader className='d-flex justify-content-center'>
                <strong>{props.product1}</strong></CardHeader>
              {props.map1}
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader className='d-flex justify-content-around'>
                <strong>{props.product2}</strong></CardHeader>
              {props.map2}
            </Card>
          </Col>
        </Row>
      </Container>
    </AccordionCollapse>
  </div>
  );
}

export default TwoMaps;
