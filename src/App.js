import React from 'react';
import './App.css';
import firebase from "./firebase-config";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>#partiuBurgerQueen</h1>
        </header>
      </div>
    );
  }
}

export default App;
