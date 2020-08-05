import React, { useState } from 'react';
import {
  TextField, makeStyles, Theme, createStyles, Button, Select, MenuItem, InputLabel, FormControl,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateMap, load } from '../../reducers/canvasReducer';
import { TileMap } from '../../services/mapsService';
import tileSets from '../../services/tileSets';
import Debug from '../../utils/Debug';

const useStyles = makeStyles((theme: Theme) => createStyles({
  form: {
    background: theme.palette.background.default,
    display: 'grid',
    gridGap: '2em',
    padding: '2em',
  },
}));

interface Props {
  handleSubmit?: Function;
}

function Settings({ handleSubmit }: Props) {
  const tileMap = useSelector((state: RootState) => state.canvas.present);
  const tileSetName = useSelector((state: RootState) => state.tileSet);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState(tileMap.name);
  const [width, setWidth] = useState(tileMap.width);
  const [height, setHeight] = useState(tileMap.height);
  const [tileSet, setTileSet] = useState(tileSetName);

  const tileSetNames = () => Object.keys(tileSets)
    .map((key: string) => <MenuItem key={key} value={key}>{key}</MenuItem>);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    Debug(event.target.value);
    setTileSet(event.target.value as string);
  };

  const handleSave = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateMap({
      ...tileMap, name, width, height, tileSet,
    }));
    if (handleSubmit) handleSubmit();
  };

  const handleCreateNew = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const newMap: TileMap = {
      tileSet,
      name: 'New Map',
      width,
      height,
      tileMap: new Array(width * height).fill(-1),
      user,
    };

    Debug('creating new map', newMap);
    dispatch(load(newMap));
    setName('New Map');
    if (handleSubmit) handleSubmit();
  };

  return (
    <div className={classes.form} >
      <TextField label='Name' variant='outlined' defaultValue={name} onChange={(event) => setName(event.target.value)} />
      <TextField label='Width' type='number' variant='outlined' defaultValue={width} onChange={(event) => setWidth(Number.parseInt(event.target.value, 10))} />
      <TextField label='Height' type='number' variant='outlined' defaultValue={height} onChange={(event) => setHeight(Number.parseInt(event.target.value, 10))} />
      <FormControl variant='outlined'>
        <InputLabel id='select-tileset-label'>Tile Set</InputLabel>
        <Select labelId='select-tileset-label' label='Tileset' value={tileSet} variant='outlined' onChange={(event) => handleChange(event)}>
          {tileSetNames()}
        </Select>
      </FormControl>
      <Button type="submit" variant='contained' color='primary' onClick={(event) => handleSave(event)} >Apply Changes</Button>
      <Button type="submit" variant='outlined' onClick={(event) => handleCreateNew(event)} >Create New</Button>
    </div>
  );
}

export default Settings;
