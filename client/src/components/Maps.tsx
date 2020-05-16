import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { getMaps, TileMap } from '../services/maps';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../reducers/historyReducer';
import Grid from './Grid';
import Tile from './Tile';
import mapping from '../9445.json';
import { RootState } from '../store';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    // Create styles
}));

function Maps() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const image = useSelector((state: RootState) => state.tileSet);

  const [maps, setMaps] = useState<TileMap[]>([]);

  useEffect(() => {
    console.log('loading maps');
    getMaps().then((maps: TileMap[]) => {
      setMaps(maps);
      console.log('maps state', maps);
    });
  }, []);

  function parseMap(map: TileMap) {
    return map.tileMap.map((tile: number, index: number) => (
      <div>
        {tile >= 0 && <Tile image={image} posX={mapping[tile].x} posY={mapping[tile].y} />}
      </div>
    ));
  }

  function parsedMaps() {
    return (
      maps.map((map: TileMap) => {
        return (
          <div>
            <Link key={map.id} to='/' onClick={() => dispatch(load(map))}>
              <Grid rows={map.height} columns={map.width} tileHeight={16} tileWidth={16} scale={1} >
                {parseMap(map)}
              </Grid>
              {map.name}
            </Link>
          </div>
        )
      })
    );
  }

  return (
    <div>
      <Button><Link to='/'>Cancel</Link></Button>
      <div>
        {parsedMaps()}
      </div>
    </div>
  )
}

export default Maps;
