import React from "react"
import { Modal, Form, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

function SignUpComponent(props) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastro
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form>
          <Form.Group controlId="formLoginEmail">
            <Form.Control
              name="emailSignUp"
              value={props.data.emailSignUp}
              type="email"
              placeholder="Digite seu email"
              onChange={props.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLoginPassword">
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
                    value="salão"
                    checked={props.data.service === "salão"}
                    onClick={props.handleClick}
                  />
                  Salão
                </label>
              </ToggleButton>
            </ToggleButtonGroup>

            <Button variant="primary" type="submit" className="mt-3" block>Entrar</Button>

          </Form.Group>

        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignUpComponent