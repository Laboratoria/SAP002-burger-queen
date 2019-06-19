import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import "./Alert.css";

export default ({ children, show, handleCloseError }) => (
  <>
    {show && (
      <div className="parent">
        <Alert
          className="child"
          variant="warning"
          onClose={handleCloseError}
          dismissible
        >
          <Alert.Heading>Atenção!</Alert.Heading>
          <p>{children}</p>
        </Alert>
      </div>
    )}
  </>
);
