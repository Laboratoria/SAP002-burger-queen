import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Lounge from "./pages/Lounge";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/lounge" component={Lounge} />
        <Route path="/kitchen" component={Kitchen} />
      </div>
    </Router>
  );
}

function Kitchen() {
  return (
    <div>
      <h1>Monte a comida</h1>
    </div>
  );
}

export default App;
