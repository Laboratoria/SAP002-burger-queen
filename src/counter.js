
import React from "react"


class Counter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            counter:props.initialCounter


        }
    }
    
    render(){
       
        const textStyle = {
        color:this.props.color
      }
  
      return(
        <div>
          <button onClick={()=> this.setState({counter:this.state.counter-1 })} >- </button>
          <span style={textStyle}> A conta está em:{this.state.counter}</span>
          <button onClick={()=> this.setState({counter:this.state.counter+1 })} >- </button> 
  
        </div>
      )
    }
   
  }
 export default Counter;    