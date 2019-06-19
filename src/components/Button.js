import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
//   input: {
//     display: 'none',
//   },
// }));


function Button(props) {
 
  const classes = useStyles();

    return (
      // <button className={props.className} onClick={props.onClick} >
      //   {props.text}
      // </button>
      <Button variant="contained" color={props.color} className={classes.button}>
      {props.text}    
      </Button>
    )
  }
  
  export default Button;