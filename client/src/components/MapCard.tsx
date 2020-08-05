import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia, CardContent,
  Typography,
  CardActions,
  Button,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import Grid from './Grid';
import { TileMap, deleteMap } from '../services/mapsService';
import { deleteMap as cutMap } from '../reducers/mapsReducer';
import Tile from './Tile';
import { load } from '../reducers/canvasReducer';
import tileSets from '../services/tileSets';
import { notify } from '../reducers/notificationsReducer';
import { RootState } from '../store';
import Debug from '../utils/Debug';
import MapLikeButton from './MapLikeButton';

const useStyles = makeStyles(() => createStyles({
  map: {
    margin: '1em',
    minWidth: '11em',
    maxWidth: '12em',
  },
  mapThumbnail: {
    display: 'flex',
    height: '10em',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.5em',
  },
}));

interface Props {
  map: TileMap
}

function MapCard({ map }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const tileSet = tileSets[map.tileSet];
  const { mapping } = tileSet;
  const dispatch = useDispatch();
  const classes = useStyles();

  function parseMap(mapToParse: TileMap) {
    return mapToParse.tileMap.map((tile: number, index: number) => (
      <div key={index}>
        {tile >= 0 && <Tile {...mapping[tile]} />}
      </div>
    ));
  }

  function removeMap(mapToRemove: TileMap) {
    dispatch(cutMap(mapToRemove));
    if (mapToRemove.id) {
      deleteMap(mapToRemove.id, user.token)
        .catch((error) => {
          Debug(error);
          dispatch(notify('Something went wrong while removing the map.', 'error'));
        });
    }
  }

  function clickHandler() {
    dispatch(load(map));
    dispatch(ActionCreators.clearHistory());
    history.push('/');
  }

  return (
    <Card className={classes.map} key={map.name}>
      <CardActionArea onClick={() => clickHandler()}>
        <CardMedia>
          <div className={classes.mapThumbnail}>
            <Grid
              rows={map.height}
              columns={map.width}
              tileHeight={tileSet.tileHeight}
              tileWidth={tileSet.tileWidth}
              scale={8 / tileSet.tileWidth} >
              {parseMap(map)}
            </Grid>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant='h6'>
            {map.name}
          </Typography>
          <Typography variant='caption'>
            {map.user && map.user.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <MapLikeButton map={map} />
        {
          user.profile === map.user?.profile
          && <Button onClick={() => removeMap(map)}>
            Delete
          </Button>
        }
      </CardActions>
    </Card>
  );
}

export default MapCard;
