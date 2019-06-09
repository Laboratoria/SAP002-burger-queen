import React from 'react';
// import './App.css';
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
      nameItem: "",  
      preço:"" ,
      listIntem: []

    }
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

    database.collection('laboratoria').add(object)
    this.setState({
      listIntem: this.state.listIntem.concat(object).reverse()
      
      })
    }

    handleOK = ()=> {
      const object = {
        nameItem: this.state.nameItem,
        preço: this.state.preço,    
            
      }
  
      database.collection('laboratoria').add(object)
      this.setState({
        listProduct: this.state.listProduct.concat(object)
        
        })
      }      
    
    render() {
      console.log(this.props.user)
            return(
        <div className="App">
           <header className="App-header">          
               <input value={this.state.name} placeholder="Digite o nome do cliente" onChange={(e)=> this.handleChange(e,"name")} />
                <Button text="publicar" onClick ={this.handleClick}/>
             {
               this.state.listIntem.map(item =>{
                 return <p> Cliente: {item.name} </p>
               })
             }
            <p>------------------------</p>
            <div>
                {DataMenuOne.map((item, i)=>{                
                  return <div> 
                            <p>
                              {item.nameItem} - {item.preço} 
                              <Button text="ok" onClick ={this.handleOK}/>                            
                            </p>                            
                         </div>
                  }
                )}          
            </div>     
           
           </header>
       </div>
      )
    }
}


export default withFirebaseAuth ({
  firebaseAppAuth,
})(Salao);



