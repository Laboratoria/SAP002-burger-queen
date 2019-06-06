import React from 'react'
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap'
import LoginComponent from './LoginComponent'
import SignUpComponent from './SignUpComponent'

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      emailLogin: "",
      passwordLogin: "",
      emailSignUp: "",
      passwordSignUp: "",
      service: "",
      modalShow: false

    };
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(event) {
    const { name, value, type, checked } = event.target
    type === "checkbox" ?
      this.setState({
        [name]: checked
      })
      :
      this.setState({
        [name]: value
      })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <Row className="justify-content-md-center">
        <Col md={4}>

          <LoginComponent
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            data={this.state}
          />

          <ButtonToolbar>
            <Button
              variant="primary"
              onClick={() => this.setState({ modalShow: true })}
              block
            >
              Cadastro
        </Button>

            <SignUpComponent
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              data={this.state}
              onHide={modalClose}
            />
          </ButtonToolbar>

        </Col>
      </Row>

    )
  }
}

export default LoginContainer