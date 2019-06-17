import React from "react";
import "./App.css";
import Home from "./pages/Home"
import Create from "./pages/Create"
import Hall from "./pages/Hall"
import Kitchen from "./pages/Kitchen"
import List from "./pages/List"
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCrown } from "@fortawesome/free-solid-svg-icons"

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="title">Burger Queen</h1>
          <FontAwesomeIcon className="icon" icon={faCrown} size="2x" />
          <Route path="/" exact component={Home} />
          <Route path="/Create" component={Create} />
          <Route path="/Hall" component={Hall} />
          <Route path="/Kitchen" component={Kitchen} />
          <Route path="/List" component={List} />
        </header>
      </div>
    </Router>
  );
}

export default App;
