import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { TileMap } from '../services/mapsService';
import { RootState } from '../store';
import { initializeMaps } from '../reducers/mapsReducer';
import MapCard from './MapCard';
import MapsFilter from './MapsFilter';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'grid',
    gridTemplateColumns:'repeat(3, 50em [col-start])',
    gridGap: '2em',
    padding: '2em'
  },
  map: {
    margin: '1em',
  },
  mapList: {
    gridRow: 2
  },
}));

function Maps() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeMaps());
  }, [dispatch]);

  const maps = useSelector((state: RootState) => state.maps);
  const classes = useStyles();

  function parsedMaps() {
    if (maps.length === 0) return <Typography>No maps were found.</Typography>;
    return (
      maps.map((map: TileMap) => <MapCard key={map.id} map={map} />)
    );
  }

  return (
    <div className={classes.container}>
      <div>
        <MapsFilter />
      </div>
      <div className={classes.mapList}>
        {parsedMaps()}
      </div>
    </div>
  );
}

export default Maps;
