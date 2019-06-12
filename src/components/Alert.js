import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

export default ({ children, show, handleCloseError }) => (
  <>
    {show && (
      <Alert variant="danger" onClose={handleCloseError} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{children}</p>
      </Alert>
    )}
  </>
);
