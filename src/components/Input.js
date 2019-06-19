import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

function OutlinedTextFields(props) {
  const classes = useStyles();
  
    return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label={props.text}
        className={classes.textField}
        value={props.value}
        onChange={props.onChange}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
}

export default OutlinedTextFields;