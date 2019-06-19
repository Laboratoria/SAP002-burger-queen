import React from 'react';
import { Collapse, Button, CardBody, Card, CardText, CardTitle, Container, Row, Col } from 'reactstrap';
import menu from '../menu';

class Burgers extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  };

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <Container>
        <Button color="warning" onClick={this.toggle} >Hambúrgueres</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card className='card' style={{ width: '44rem' }}>
            <CardBody>
              <Container>
                <Row>
                  <Col>
                    <h3>Hambúrgueres simples:</h3>
                    {menu.burgers.simple.map((product, index) => {
                      return <Card style={{ width: '18rem' }}>
                        <CardBody>
                          <CardTitle><h5>{product.nome}</h5></CardTitle>
                          <CardText>
                            R$ {product.preco}
                          </CardText>
                          <Button key={index}
                            onClick={() => this.clickBuy(product)}
                            color="warning"> Adicionar</Button>
                        </CardBody>
                      </Card>
                    })}
                  </Col>
                  <Col>
                    <h3>Hambúrgueres duplo:</h3>
                    {menu.burgers.double.map((product, index) => {
                      return <Card style={{ width: '18rem' }}>
                        <CardBody>
                          <CardTitle><h5>{product.nome}</h5></CardTitle>
                          <CardText>
                            R$ {product.preco}
                          </CardText>
                          <Button key={index}
                            onClick={() => this.clickBuy(product)}
                            color="warning"> Adicionar</Button>
                        </CardBody>
                      </Card>
                    })}
                  </Col>
                </Row>
              </Container>
            </CardBody>
          </Card>
        </Collapse>
      </Container>
    )
  }
}

export default Burgers;
