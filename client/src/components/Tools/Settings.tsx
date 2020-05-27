import React, { useState } from 'react';
import { TextField, makeStyles, Theme, createStyles, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateMap, load } from '../../reducers/canvasReducer';
import { TileMap } from '../../services/mapsService';

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
  const [width, setWidth] = useState(tileMap.width);
  const [height, setHeight] = useState(tileMap.height);

  const handleSave = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateMap({ ...tileMap, name, width, height }));
  };

  const handleCreateNew = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const newMap: TileMap = {
      name: 'New Map',
      width,
      height,
      tileMap: new Array(width * height).fill(-1)
    }
    dispatch(load(newMap));
  }

  return (
    <div className={classes.form} >
      <TextField label='Name' variant='outlined' defaultValue={name} onChange={(event) => setName(event.target.value)} />
      <TextField label='Width' type='number' variant='outlined' defaultValue={width} onChange={(event) => setWidth(Number.parseInt(event.target.value))} />
      <TextField label='Height' type='number' variant='outlined' defaultValue={height} onChange={(event) => setHeight(Number.parseInt(event.target.value))} />
      <Button type="submit" variant='contained' color='primary' onClick={(event) => handleSave(event)} >Save Changes</Button>
      <Button type="submit" variant='outlined' onClick={(event) => handleCreateNew(event)} >New</Button>
    </div>
  )
}

export default Settings;