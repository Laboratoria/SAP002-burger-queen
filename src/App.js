import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Lounge from "./pages/Lounge";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-intro text-center">
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
      </div>

      <Route path="/lounge" component={Lounge} />
      <Route path="/kitchen" component={Kitchen} />
    </Router>
    // <Router>
    //   <div className="text-center">
    //     <header className="App-bg">
    //       <Route path="/" exact component={Login} />
    //       <Route path="/register" component={Register} />
    //       <Route path="/lounge" component={Lounge} />
    //       <Route path="/kitchen" component={Kitchen} />
    //     </header>
    //   </div>
    // </Router>
  );
}

function Kitchen() {
  return (
    <div>
      <h1>Estamos na Cozinha</h1>
    </div>
  );
}

export default App;
