import React from "react";
import "../App.css";
import firebase from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

const menu = [
  {
    item: "Café Americano",
    price: 5
  },
  {
    item: "Café com Leite",
    price: 7
  },
  {
    item: "Sanduíche de Presunto e Queijo",
    price: 10
  },
  {
    item: "Suco de fruta Natural",
    price: 7
  }
];

class Lounge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: []
    };
  }

  componentDidMount() {
    database
      .collection("testenologin")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  handleChange = (event, elem) => {
    const newState = this.state;
    newState[elem] = event.target.value;
    this.setState(newState);
  };

  handleClick = () => {
    const object = {
      email: this.state.email,
      password: this.state.password
    };
    database.collection("testenologin").add(object);
    this.setState({
      listItem: this.state.listItem.concat(object)
    });
  };

  render() {
    return (
      <div>
        <h1>Faça seu pedido</h1>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Lounge);
