import React from "react"
import firebase from './firebaseConfig'
import { Container, Row, Col, Button } from 'react-bootstrap'

class Hall extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase.auth().signOut()
    .then(this.props.history.push(`/`))
  }

  render() {
    return (
      <>
      <Container>
  <Row>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          onClick={this.logout}
          block>
          salão
</Button>
</Container>
      </>

    )
  }
}


export default Hall