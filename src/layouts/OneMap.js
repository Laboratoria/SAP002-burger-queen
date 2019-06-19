import React from 'react';
import { Card, CardHeader, Container, Row, Col } from 'reactstrap';
import AccordionCollapse from 'react-bootstrap/AccordionCollapse';
import AccordionToggle from 'react-bootstrap/AccordionToggle';
import { Link } from 'react-router-dom'
import Icon from '../components/Icon';

function OneMap(props) {
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
              {props.map}
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </AccordionCollapse>
  </div>
  );
}

export default OneMap;