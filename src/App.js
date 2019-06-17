import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Lounge from "./pages/Lounge";
import Kitchen from "./pages/Kitchen";
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

export default App;
