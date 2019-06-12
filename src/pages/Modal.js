import React from 'react';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { Button, Modal as ModalBootstrap, Form } from 'react-bootstrap';


const firebaseAppAuth = firebase.auth();

function Modal(props) {
  return (
    <>
      <ModalBootstrap show={props.show} onHide={props.handleClose}>
        <ModalBootstrap.Header closeButton>
          <ModalBootstrap.Title className="dark-text">Faça aqui seu cadastro:</ModalBootstrap.Title>
        </ModalBootstrap.Header>

        <ModalBootstrap.Body>
          <form className="d-flex flex-column justify-content-center mt-2">
            <Form className=" mt-2" >
              <Form.Group controlId="formBasicname">
                <Form.Label className="red-text">Nome Completo</Form.Label>
                <Form.Control className="red-text" value={props.name} onChange={(event) => props.handleChange(event, "name")} type="name" placeholder="Digite seu nome completo" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="red-text">E-mail</Form.Label>
                <Form.Control className="red-text" value={props.email} onChange={(event) => props.handleChange(event, "email")} type="text" placeholder="Digite seu E-mail" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="red-text">Senha</Form.Label>
                <Form.Control className="red-text" value={props.password} onChange={(event) => props.handleChange(event, "password")} type="password" placeholder="Digite sua Senha" />
              </Form.Group>
            </Form>
            <div className="d-flex justify-content-center flex-column">
              <div className="d-flex justify-content-center my-2">
                <p className="white-text">Escolha o Ambiente:</p>
              </div>
              <form className="d-flex justify-content-center">
                <div className="d-flex flex-row mx-2 align-items-baseline">
                  <input type="radio" name="optradio" className="white-text mx-2" value="DinnerHall" onChange={(event) => props.handleChange(event, "place")} /><p className="red-text">Salão</p>
                </div>
                <div className="d-flex flex-row mx-2 align-items-baseline">
                  <input type="radio" name="optradio" className="mx-2 radio-menu" value="DinnerKitchen" onChange={(event) => props.handleChange(event, "place")} /><p className="red-text">Cozinha</p>
                </div>
              </form>
            </div>
          </form>
        </ModalBootstrap.Body>

        <ModalBootstrap.Footer>
          <Button className="white-text" variant="danger" onClick={(event) => props.createUser(event)}>
            Enviar
            </Button>
        </ModalBootstrap.Footer>
      </ModalBootstrap>
    </>
  );
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(Modal);

