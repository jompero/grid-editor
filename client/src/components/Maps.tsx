import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { getAll, TileMap, } from '../services/mapsService';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Button } from '@material-ui/core';
import { setMaps, initializeMaps } from '../reducers/mapsReducer';
import MapCard from './MapCard';

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

  // useEffect(() => {
  //   console.log('loading maps');
  //   getMaps().then((maps: TileMap[]) => {
  //     dispatch(setMaps(maps));
  //     console.log('maps state', maps);
  //   });
  // }, [dispatch]);



  function parsedMaps() {
    return (
      maps.map((map: TileMap) => <MapCard key={map.id} map={map} />)
    );
  }

  return (
    <div>
      <Button><Link to='/'>Cancel</Link></Button>
      <div className={classes.mapList}>
        {parsedMaps()}
      </div>
    </div>
  )
}

export default Maps;
