//registro ok, puxa a página do tipo

import React from 'react';
// import Breakfast from '../breakfast.json';
// import AllDay from '../allday.json'

class Dashboard extends React.Component{
    constructor(props) {
        super();
        this.props = props;
        if(sessionStorage.getItem('user')){
            console.log (sessionStorage.getItem('name'))
            console.log(sessionStorage.getItem('type'));
            
//pegar o id do uduário do firebase
//dentro desse id ver o tipo de página
//retornar a página do tipo
        }
        else{
            this.props.history.push('/Login');
        }
    }
    
    render() {
        return (
            <h1>Dashboard</h1>
            )
        }
    }

export default Dashboard;