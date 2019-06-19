import React from 'react';
import { Collapse, Button, CardBody, Card, CardText, CardTitle, Container } from 'reactstrap';
import menu from '../menu';

class Accompaniments extends React.Component {
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
        <Button color="warning" onClick={this.toggle} >Acompanhamentos</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card className='card' style={{ width: '22rem' }}>
            <CardBody>
              {menu.accompaniments.map((product, index) => {
                return <Card style={{ width: '18rem' }}>
                  <CardBody>
                    <CardTitle><h5>{product.nome}</h5></CardTitle>
                    <CardText>
                      R$ {product.preco}
                    </CardText>
                    <Button key={index} onClick={() => this.clickBuy(product)}
                      color="warning"> Adicionar </Button>
                  </CardBody>
                </Card>
              })}
            </CardBody>
          </Card>
        </Collapse>
      </Container>
    )
  }
}

export default Accompaniments;