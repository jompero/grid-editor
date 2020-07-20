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
    display: 'flex',
    flex: 'auto',
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: '2em'
  },
  filter: {
    flex: 'auto',
  },
  map: {
    margin: '1em',
  },
  mapList: {
    display: 'flex'
  },
}));

function Maps() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeMaps());
  }, [dispatch]);

  const maps = useSelector((state: RootState) => state.maps);
  const mapsFilter = useSelector((state: RootState) => state.mapsFilter);
  const classes = useStyles();

  const filterMaps = () => {
    return maps.filter((map) => {
      return (
        map.name.toLowerCase().includes(mapsFilter.text.toLowerCase()) 
        && (mapsFilter.users.length === 0 
          || (map.user.id && mapsFilter.users.includes(map.user.id))))
    })
  }

  function parsedMaps() {
    const filteredMaps = filterMaps();
    if (filteredMaps.length === 0) return <Typography>No maps were found.</Typography>;
    return (
      filteredMaps.map((map: TileMap) => <MapCard key={map.id} map={map} />)
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
