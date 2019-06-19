import React from 'react';
import firebase from '../firebaseConfig';
import './Hall.css'
import withFirebaseAuth from 'react-with-firebase-auth'
import Menu1 from '../components/Menu1'
import Menu2 from '../components/Menu2'
import Button from '../components/Button'

const firebaseAppAuth = firebase.auth()

class Hall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        clientValue:"",
        buy: []
        };
        this.state = {   
        isMenu1:true, 
        isMenu2:false
        };
    }
    
    showMenu1 () {
        this.setState({isMenu1:true, isMenu2:false})
    }  

    showMenu2 () {
        this.setState({isMenu2:true, isMenu1:false});
    }

    handleChange = (event, element) => {
      const newState = this.state;
      newState[element] = event.target.value
      this.setState(newState)
    } 
    
    
    render () {
        return (
        <div className="root-container">
        <div className="menu-header">
        <div className={"menu-tab" + (this.state.isMenu2? "selected-menu-tab":"")}
        onClick={this.showMenu1.bind(this)}>
        Cafe-da-manhã
        </div>

        <div className={"menu-tab" + (this.state.isMenu1? "selected-menu-tab":"")}
        onClick={this.showMenu2.bind(this)}>
        Almoço/Jantar
        </div>
        </div>
        
       

        <div className="box-menu">
        {this.state.isMenu1 &&
        <Menu1 />
        }
        </div>
        
        <div className="box-menu">
        {this.state.isMenu2 &&
        <Menu2 />
        }
        </div>
        </div>
        );
    }
}
        

export default withFirebaseAuth({firebaseAppAuth,})(Hall);
