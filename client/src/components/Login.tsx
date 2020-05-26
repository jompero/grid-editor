import React, { useState } from 'react';
import { TextField, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    display: 'grid',
    gridGap: '2em',
    background: 'white',
    padding: '2em'
  },
}));

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField label='Username' variant='outlined' defaultValue={username} onChange={(event) => setUsername(event.target.value)} />
      <TextField label='Password' variant='outlined' defaultValue={password} onChange={(event) => setPassword(event.target.value)} />
      <Button onClick={() => dispatch(login(username, password))}>Login</Button>
    </form>
  )
}

export default Login;