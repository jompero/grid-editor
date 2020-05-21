import React, { useState } from 'react';
import { TextField, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateMap } from '../../reducers/canvasReducer';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    display: 'grid',
    gridGap: '2em',
    background: 'white',
    padding: '2em'
  },
}));

function Settings() {
  const tileMap = useSelector((state: RootState) => state.canvas.tileMap);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState(tileMap.name);
  const [width, setWidth] = useState(tileMap.width.toString());
  const [height, setHeight] = useState(tileMap.height.toString());

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateMap({ ...tileMap, name, width: Number.parseInt(width), height: Number.parseInt(height) }));
  };

  return (
    <div className={classes.form}>
      <TextField label='Name' variant='outlined' defaultValue={name} onChange={(event) => setName(event.target.value)} />
      <TextField label='Width' type='number' variant='outlined' defaultValue={width} onChange={(event) => setWidth(event.target.value)} />
      <TextField label='Height' type='number' variant='outlined' defaultValue={height} onChange={(event) => setHeight(event.target.value)} />
      <Button type="submit" onClick={(event) => handleSubmit(event)} >Save</Button>
    </div>
  )
}

export default Settings;