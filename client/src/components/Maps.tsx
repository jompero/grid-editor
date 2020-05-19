import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { getMaps, TileMap, deleteMap } from '../services/maps';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../reducers/historyReducer';
import Grid from './Grid';
import Tile from './Tile';
import mapping from '../9445.json';
import { RootState } from '../store';
import { Button, Card, CardMedia, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';
import { setMaps } from '../reducers/mapsReducer';

const useStyles = makeStyles((theme: Theme) => createStyles({

    map: {
      margin: '1em',
    },
    mapList: {
      display: 'flex'
    }
}));

function Maps() {
  const dispatch = useDispatch();
  const image = useSelector((state: RootState) => state.tileSet);
  const maps = useSelector((state: RootState) => state.maps);
  const classes = useStyles();

  useEffect(() => {
    console.log('loading maps');
    getMaps().then((maps: TileMap[]) => {
      dispatch(setMaps(maps));
      console.log('maps state', maps);
    });
  }, []);

  function parseMap(map: TileMap) {
    return map.tileMap.map((tile: number, index: number) => (
      <div key={index}>
        {tile >= 0 && <Tile image={image} posX={mapping[tile].x} posY={mapping[tile].y} />}
      </div>
    ));
  }

  function removeMap(id?: string) {
    const newMaps = maps.filter(map => map.id !== id);
    dispatch(setMaps(newMaps));
    id && deleteMap(id);
  }

  function parsedMaps() {
    return (
      maps.map((map: TileMap) => {
        return (
          <Card className={classes.map} key={map.name}>
            <CardActionArea>
              <CardMedia component={Link} to={'/'} onClick={() => dispatch(load(map))}>
                <div>
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
              <Button onClick={() => removeMap(map.id || '')}>
                Delete
              </Button>
            </CardActions>
          </Card>
        )
      })
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
