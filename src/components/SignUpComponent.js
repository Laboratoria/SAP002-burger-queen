import React from "react"
import { Modal, Form, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

function SignUpComponent(props) {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.modalShow}
      onHide={props.modalClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastro
          </Modal.Title>
      </Modal.Header>
      <Modal.Body >
          <Form className="px-5 py-3">

          <Form.Group controlId="formSignUpName">
              <Form.Control
                name="name"
                value={props.data.name}
                type="text"
                placeholder="Nome Completo"
                onChange={props.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSignUpEmail">
              <Form.Control
                name="emailSignUp"
                value={props.data.emailSignUp}
                type="email"
                placeholder="Digite seu email"
                onChange={props.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSignUpPassword">
              <Form.Control
                name="passwordSignUp"
                value={props.data.passwordSignUp}
                type="password"
                placeholder="Digite sua senha"
                onChange={props.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <ToggleButtonGroup type="radio" name="options" className="w-100">
                <ToggleButton>
                  <label>
                    <input
                      type="radio"
                      name="service"
                      value="cozinha"
                      checked={props.data.service === "cozinha"}
                      onClick={props.handleClick}
                    />
                    Cozinha
                </label>
                </ToggleButton>

                <ToggleButton>
                  <label>
                    <input
                      type="radio"
                      name="service"
                      value="salao"
                      checked={props.data.service === "salao"}
                      onClick={props.handleClick}
                    />
                    Salão
                </label>
                </ToggleButton>
              </ToggleButtonGroup>

              <Button
              variant="primary"
              type="submit"
              className="mt-3"
              onClick={props.createUser}
              block>
              Cadastrar
              </Button>

            </Form.Group>
          </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpComponent