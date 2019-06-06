import React from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth'



const firebaseAppAuth = firebase.auth()
const database = firebase.firestore();

class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name:"",
      listItem:[]
    };
  }

componentDidMount(){
    database.collection('clientes').get()
     .then((querySnapshot) => {
         const data = querySnapshot.docs.map(doc => doc.data()
         );
         console.log(data)
         this.setState({ listItem: data });
     });
}

changeState = (event, element) => {
  const newState = this.state;
  newState[element] = event.target.value
  this.setState(newState);
}

changeClick = () => {
    const object = {
        name: this.state.name
    }
    database.collection('user').add(object)
    this.setState({
        listItem: this.state.listItem.concat(object)
    })
}

  render() {
    return (
      <div>
          <h1>#partiuBurgerQueen</h1>
          <input value = {this.state.name} onChange={(e) => this.changeState(e,"name")}
        placeholder = "Nome do cliente" />
          <Button text = "incluir" onClick={this.changeClick} />
          {
              this.state.listItem.map((item, index) =>{
                  return <p key={index}>{item.name}</p>
              })
          }
      </div>
    );
  }
}

export default withFirebaseAuth({firebaseAppAuth,})(Salao);
