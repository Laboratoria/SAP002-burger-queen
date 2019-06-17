import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import "./Alert.css";

export default ({ children, show, handleCloseError }) => (
  <>
    {show && (
      <div className="parent">
        <Alert
          className="child"
          variant="danger"
          onClose={handleCloseError}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{children}</p>
        </Alert>
      </div>
    )}
  </>
);
