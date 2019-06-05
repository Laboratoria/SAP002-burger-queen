// import React from 'react';
// import './App.css';
// import firebase from "./firebaseConfig";
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1>#partiuBurgerQueen</h1>
//         </header>
//       </div>
//     );
//   }
// }


import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Button from './button.js'
// import Counter from './counter.js'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Home from "./pages/Home";
import Salao from "./pages/Salao";

function App() {
  return(
    <Router>
    <div className="App">
      <header className="App-header">
        <Route path="/" exact component={Home} />
        <Route path="/salao" component={Salao} />
      </header>
  </div>
 </Router>
  );
}






export default App;
