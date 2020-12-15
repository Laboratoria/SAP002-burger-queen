import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from '../firebaseConfig';
import Button from '@material-ui/core/Button';
import './Kitchen.css';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: "",
      funcionario: "",
      comprar: []
    };
  }

  componentDidMount() {
    database.collection('orders').get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs.map(doc => {
          if (!doc.data().finishedTime) {
            return {
              data: doc.data(),
              id: doc.id,
            }
          }
        })
          .filter(item => item);
        const compare = (a, b) => {
          let firstOrder = parseFloat((a.data.hour).replace(':').replace(/[^\d.-]/g, ''));
          let secondOrder = parseFloat((b.data.hour).replace(':').replace(/[^\d.-]/g, ''));
          if (firstOrder < secondOrder) {
            return -1;
          } else if (firstOrder > secondOrder) {
            return 1;
          } else {
            return 0;
          }
        }
        this.setState({ comprar: doc.sort(compare) });
      });
  }

  handleClick = (id) => {
    const now = new Date();
    const hour = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    database.collection('orders').doc(id).update({
      finishedTime: hour
    })
  }

  logout = () => {
    firebaseAppAuth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
        this.props.history.push(`/`);
      });
  }

  render() {
    console.log(this.state.funcionario)
    return (
      <div className="menu">
        <h1>Bem vindo a Cozinha!</h1>
        {this.state.comprar.map((opcao, index) => {
          return <div className="column3" key={index}>
            <p><b>Hora: </b>{opcao.data.hour}</p>
            <p><br /><b>Cliente:</b> {opcao.data.cliente}</p>
            <p><b>Func: </b>{opcao.data.funcionario}</p>
            <div>{opcao.data.comprar.map((opcao, index) => {
              return <p key={index}>{opcao.item} - {opcao.quantidade}</p>
            })}
            </div>
          </div>
        })}
        <Button color="secondary" variant="contained" onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Kitchen);