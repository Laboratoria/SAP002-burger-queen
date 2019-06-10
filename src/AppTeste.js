import React from 'react';
import './App.css';
import Button from './Button.js';
import firebase from "./firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 
'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      banana: "",
      peixinho: "",
      listItem: []
    };
  }

  componentDidMount() {
    database.collection('laboratoria').get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.data());
      this.setState({ listItem: data });
    });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    const object = {
      banana: this.state.banana,
      peixinho: this.state.peixinho
    }
    database.collection('laboratoria').add(object)   
    this.setState({
      listItem:  this.state.listItem.concat(object)   
    })
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword
    (this.state.email, this.state.password);
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword
    (this.state.email, this.state.password)
      // .then(() => {
      //   alert("Cadastro feito com sucesso!");

      // })
  }

  render() {

    console.log(this.props)

    return (
      <div className="App">
        <header className="App-header">
          <h1>Burger Queen App</h1>
          <input value={this.state.email}
            placeholder="email"
            onChange={(e) => this.handleChange(e, "email")} />
          <input value={this.state.password}
            placeholder="password"
            onChange={(e) => this.handleChange(e, "password")} />
          <Button text="Entrar" onClick={this.signIn} />
          <Button text="Cadastrar" onClick={this.createUser} />
          
          
          <input value={this.state.banana}
            placeholder="banana"
            onChange={(e) => this.handleChange(e, "banana")} />
          <input value={this.state.peixinho}
            placeholder="peixinho"
            onChange={(e) => this.handleChange(e, "peixinho")} />
          <Button text="ClickBP" onClick={this.handleClick} />

          {
            this.state.listItem.map((item, index) => {
              return <p key={index}>
              {item.banana} | {item.peixinho}</p>
            })
          }
        </header>
      </div>
    );
  }
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(App);


// App
// import React from 'react';
// import './App.css';
// import Home from './pages/Home';
// import Salao from './pages/Salao';
// import { BrowserRouter as Router, Route, Redirect } from
//   'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <Route path="/" exact component={Home} />
//           <Route path="/salao" component={Salao} />
//         </header>
//       </div>
//     </Router>
//   );
// }


// export default App;




// S A L Ã O
// import React from 'react';


// const product = [
//   {
//     iten: "Café Amaricano",
//     price: "5.00"
//   },
//   {
//     iten: "Café com Leite",
//     price: "7.00"
//   },
//   {
//     iten: "Sanduíche de Presunto e Queijo",
//     price: "10.00"
//   },
//   {
//     iten: "Suco de Fruta Natural",
//     price: "7.00"
//   }
// ];

// class Salao extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       listItem: []
//     };
//   }


//   clickBuy = (item) => {
//     const itemIndex = this.state.listItem.findIndex((product) => {
//       return product.iten === item.iten;
//     });

//     if (itemIndex < 0) {
//       const newItem = {
//         ...item,
//         quantity: 1
//       };
//       this.setState({
//         listItem: this.state.listItem.concat(newItem)
//       });
//     } else {
//       let newBuy = this.state.listItem;
//       newBuy[itemIndex].quantity += 1;
//       this.setState({
//         listItem: newBuy
//       });
//     }

//   }

//   render() {
//     const totaltoPay = this.state.listItem.reduce((acc, cur)
//       => {
//       return acc + (cur.quantity * cur.price)
//     }, 0);

//     return (
//       <React.Fragment>
//         {
//           products.map((product, index => {
//             return <button key={index}
//               onClick={() => this.clickBuy(product)}>
//               {product.iten}</button>
//           })
//         }
//         <hr ></hr>
//         <h1>Itens</h1>
//         {
//           this.state.listItem.map((product, index) => {
//             return <p key={index}>{product.iten} -
//             {product.price * product.quantity} -
//             {product.quantity}</p>
//           })
//         }
//         <hr></hr>
//         <h1>Total</h1>
//         <p>Valor Total: {totaltoPay}</p>


//       </React.Fragment >
//     );
//   }
// }



// export default (Salao);
