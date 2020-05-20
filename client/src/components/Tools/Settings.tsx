import React from 'react';
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeName } from '../../reducers/canvasReducer';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    background: 'white',
    padding: '2em'
  },
}));

function Settings() {
  const tileMap = useSelector((state: RootState) => state.canvas.tileMap);
  const dispatch = useDispatch();
  const classes = useStyles();

  const setName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeName(event.target.value));
  }

  return (
    <form className={classes.form} autoComplete='off'>
      <TextField label='Name' variant='outlined' defaultValue={tileMap.name} onChange={(event) => setName(event)} />
    </form>
  )
}

export default Settings;