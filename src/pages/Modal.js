import React from 'react';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import {Button, Modal as ModalBootstrap} from 'react-bootstrap';

const firebaseAppAuth = firebase.auth();


class Modal extends React.Component {
  
   
  
  render() {
    return (
      <>
        <ModalBootstrap show={this.props.show} onHide={this.props.handleClose}>
          <ModalBootstrap.Header closeButton>
            <ModalBootstrap.Title>ModalBootstrap heading</ModalBootstrap.Title>
          </ModalBootstrap.Header>
          <ModalBootstrap.Body>Woohoo, you're reading this text in a ModalBootstrap!</ModalBootstrap.Body>
          <ModalBootstrap.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.handleClose} onClick={(event) => this.createUser(event)}>
              Save Changes
            </Button>
          </ModalBootstrap.Footer>
        </ModalBootstrap>
      </>
    );
  }
}

export default Modal;
