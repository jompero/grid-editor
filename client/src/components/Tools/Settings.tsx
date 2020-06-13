import React, { useState } from 'react';
import { TextField, makeStyles, Theme, createStyles, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateMap, load } from '../../reducers/canvasReducer';
import { TileMap } from '../../services/mapsService';
import tileSets from '../../services/tileSets';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    display: 'grid',
    gridGap: '2em',
    background: 'white',
    padding: '2em'
  },
}));

function Settings() {
  const tileMap = useSelector((state: RootState) => state.canvas.present);
  const tileSetName = useSelector((state: RootState) => state.tileSet);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState(tileMap.name);
  const [width, setWidth] = useState(tileMap.width);
  const [height, setHeight] = useState(tileMap.height);
  const [tileSet, setTileSet] = useState(tileSetName);

  const tileSetNames = () => {
    return Object.keys(tileSets).map((tileSet: string) => {
      return <MenuItem key={tileSet} value={tileSet}>{tileSet}</MenuItem>
    });
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value);
    setTileSet(event.target.value as string);
  };

  const handleSave = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateMap({ ...tileMap, name, width, height, tileSet }));
  };

  const handleCreateNew = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const newMap: TileMap = {
      tileSet,
      name: 'New Map',
      width,
      height,
      tileMap: new Array(width * height).fill(-1),
    }

    console.log('creating new map', newMap);
    dispatch(load(newMap));
    setName('New Map');
  };

  return (
    <div className={classes.form} >
      <TextField label='Name' variant='outlined' defaultValue={name} onChange={(event) => setName(event.target.value)} />
      <TextField label='Width' type='number' variant='outlined' defaultValue={width} onChange={(event) => setWidth(Number.parseInt(event.target.value))} />
      <TextField label='Height' type='number' variant='outlined' defaultValue={height} onChange={(event) => setHeight(Number.parseInt(event.target.value))} />
      <FormControl variant='outlined'>
        <InputLabel id='select-tileset-label'>Tile Set</InputLabel>
        <Select labelId='select-tileset-label' label='Tileset' value={tileSet} variant='outlined' onChange={(event) => handleChange(event)}>
          {tileSetNames()}
        </Select>
      </FormControl>
      <Button type="submit" variant='contained' color='primary' onClick={(event) => handleSave(event)} >Apply Changes</Button>
      <Button type="submit" variant='outlined' onClick={(event) => handleCreateNew(event)} >Create New</Button>
    </div>
  )
};

export default Settings;