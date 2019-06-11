import React from 'react';
import '../Salao.css';
import Button from '../button';
// import Counter from './counter.js;'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import DataMenuOne from "../data/menuOne";
import DataMenuTwo from  "../data/menuTwo";


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class Salao extends React.Component{
  constructor(props){
    super(props);
    this.state = {
     
      name: "", 
      listIntem: [],     
      comprar: []

    }
    // {
    //   nome,
    //   nomef,
    //   comprar
    // }
  }
  componentDidMount(){
    database.collection('laboratoria').get()
    .then((querySnapshot)=> {
      const data= querySnapshot.docs.map(doc =>doc.data())
      this.setState({listIntem: data})

    });
  }
  handleChange = (event, element) => {
    const newState = this.state;
    newState[element]=event.target.value
    this.setState(newState);
  }

  handleClick = ()=> {
    const object = {
      name: this.state.name,     
        }

    // database.collection('laboratoria').add(object)
    // this.setState({
    //   listIntem: this.state.listIntem.concat(object).reverse()
      
    //   })
    }

  clickComprar = (item) => {
    const itemIndex = this.state.comprar.findIndex((DataMenuOne) =>
       {
          return DataMenuOne.nameItem === item.nameItem
      })
      if(itemIndex < 0) {
        const newItem = {
          ...item,
          quantidade: 1
        };
        this.setState({
          comprar: this.state.comprar.concat(newItem)
        });
      } else {
        let newCompra = this.state.comprar;
        newCompra[itemIndex].quantidade +=1;
        this.setState({
          comprar: newCompra
        });
      }
    }
   
    render() {
      const valorTotal = this.state.comprar.reduce((acc, cur) => 
      {
        return acc + (cur.quantidade * cur.price)
      }, 0);
    
            return(
        <div className="App">
           <header className="App-header teste">          
               <input value={this.state.name} placeholder="Digite o nome do cliente" onChange={(e)=> this.handleChange(e,"name")} />
                <Button text="publicar" onClick ={this.handleClick}/>
             {
               this.state.listIntem.map(item =>{
                 return <p> Cliente: {item.name} </p>
               })
             }
            <hr></hr>
            <div>
                {DataMenuOne.map((item, i)=>{                
                  return <div> 
                            <p>
                              <button key={i} onClick={()=> {this.clickComprar(item)}}>{item.nameItem} - {item.price} </button>
                            </p>                            
                         </div>
                  }
                )}          
            </div> 

            <div >
              <p>Lista de compras </p>
              {
                this.state.comprar.map((produto, i)=>{
                  return <p key={i}> {produto.quantidade} - {produto.nameItem} : {produto.price * produto.quantidade}  
                  </p>
                })

              }
                <hr></hr>
                <h1>Total</h1>
                <p>Valor Toral: {valorTotal}</p>
            </div>
           </header>
       </div>
      )
    }
}


export default withFirebaseAuth ({
  firebaseAppAuth,
})(Salao);



