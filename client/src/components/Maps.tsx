import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { TileMap, } from '../services/mapsService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { initializeMaps } from '../reducers/mapsReducer';
import MapCard from './MapCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({ 
    map: {
      margin: '1em',
    },
    mapList: {
      display: 'flex'
    }
}));

function Maps() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeMaps());
  }, [dispatch]);

  const maps = useSelector((state: RootState) => state.maps);
  const classes = useStyles();

  function parsedMaps() {
    if (maps.length === 0) return <Typography>No maps were found.</Typography>
    return (
      maps.map((map: TileMap) => <MapCard key={map.id} map={map} />)
    );
  }

  return (
    <div className={classes.mapList}>
      {parsedMaps()}
    </div>
  )
}

export default Maps;
