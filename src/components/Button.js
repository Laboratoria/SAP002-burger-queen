import React from 'react';
import Button from '@material-ui/core/Button';


function Button(props) {

  const classes = useStyles();

  return (
    <Button variant="contained" color={props.color} className={classes.button}>
      {props.text}
    </Button>
  )
}

export default Button;