import React from "react"
import firebase from './firebaseConfig'
import { Container, Row, Col, CardColumns, Card, Button } from 'react-bootstrap'
import menuData from "./menuData"
import CardMenu from "./components/CardMenu"

class Hall extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: menuData
  }
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase.auth().signOut()
    .then(this.props.history.push(`/`))
  }
  
  Child({ match }) {
    return (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    );
  }

  render() {
    const cardMenu = this.state.menu.map(item => <CardMenu key={item.id} item={item} sendToCart={this.sendToCart}/>)
    
    return (
      <>
      <Container className="fluid">
  <Row>
    <Col md={7}>
    <CardColumns className="d-flex flex-wrap">
    {cardMenu}
    </CardColumns>
    </Col>
    <Col>
    <Card className="text-center">
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  <Card.Footer className="text-muted">2 days ago</Card.Footer>
</Card>
</Col>
  </Row>
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          onClick={this.logout}
          block>
          Sair
</Button>
</Container>
      </>

    )
  }
}


export default Hall