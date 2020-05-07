import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import getMaps from '../services/maps';

const useStyles = makeStyles((theme: Theme) => createStyles({
    // Create styles
}));

interface TileMap {
  width: number,
  height: number,
  tileMap: number[]
}

function Maps() {
  const classes = useStyles();

  const [maps, setMaps] = useState<TileMap[]>([]);

  useEffect(() => {
    console.log('loading maps');
    getMaps().then((maps: TileMap[]) => {
      setMaps(maps);
      console.log('maps state', maps);
    });
  }, []);

  if (maps) return (
    <div>{maps.map((map: TileMap) => (<div>This map is {map.width} wide, {map.height} tall.</div>))}</div>
  )

  return (
        <div>
          Loading
        </div>
  );
}

export default Maps;
