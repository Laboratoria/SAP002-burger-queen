import React from "react"
import { Form, Button } from 'react-bootstrap'

function LoginComponent(props) {
  return (
    <Form>
    <h1 className="text-center my-5">Login</h1>
      <Form.Group controlId="formLoginEmail">
        <Form.Control
          name="emailLogin"
          value={props.data.emailLogin}
          type="email"
          placeholder="Digite seu email"
          onChange={props.handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formLoginPassword">
        <Form.Control
          name="passwordLogin"
          value={props.data.passwordLogin}
          type="password"
          placeholder="Digite sua senha"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Button
      variant="primary"
      type="submit"
      className="mb-3"
      onClick={props.login}
      block>
      Entrar
      </Button>
    </Form>
  )
}
export default LoginComponent