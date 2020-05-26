import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Theme, createStyles, makeStyles } from '@material-ui/core';
import Grid from './Grid';
import { TileMap, deleteMap } from '../services/maps';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMap as cutMap } from '../reducers/mapsReducer';
import { RootState } from '../store';
import Tile from './Tile';
import { load } from '../reducers/canvasReducer';
import getTileProps from '../utils/tileMapping';

const useStyles = makeStyles((theme: Theme) => createStyles({
  map: {
    margin: '1em'
  },
  mapThumbnail: {
    display: 'flex',
    height: '10em',  
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.5em'
  }
}));

interface Props {
  map: TileMap
}

function MapCard({ map }: Props) {
  const tileSet = useSelector((state: RootState) => state.tileSet);
  const dispatch = useDispatch();
  const classes = useStyles();

  function parseMap(map: TileMap) {
    return map.tileMap.map((tile: number, index: number) => (
      <div key={index}>
        {tile >= 0 && <Tile {...getTileProps(tile, tileSet)} />}
      </div>
    ));
  }

  function removeMap(map: TileMap) {
    dispatch(cutMap(map));
    map.id && deleteMap(map.id);
  }

  return (
    <Card className={classes.map} key={map.name}>
      <CardActionArea>
        <CardMedia component={Link} to={'/'} onClick={() => dispatch(load(map))}>
          <div className={classes.mapThumbnail}>
            <Grid rows={map.height} columns={map.width} tileHeight={16} tileWidth={16} scale={0.5} >
              {parseMap(map)}
            </Grid>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h6">
            {map.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button component={Link} to={'/'} onClick={() => dispatch(load(map))}>
          Load
          </Button>
        <Button onClick={() => removeMap(map)}>
          Delete
          </Button>
      </CardActions>
    </Card>
  )
};

export default MapCard;