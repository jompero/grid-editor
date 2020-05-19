import React from 'react';
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    background: 'white',
    padding: '2em'
  },
}));

function Settings() {
  const classes = useStyles();

  return (
    <form className={classes.form} autoComplete='off'>
      <TextField label='Name' variant='outlined' />
    </form>
  )
}

export default Settings;