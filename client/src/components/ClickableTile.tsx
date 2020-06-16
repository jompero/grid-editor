import * as React from 'react';
import Tile from './Tile';
import tileSets from '../services/tileSets';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

export interface Props {
  index: number;
  onMouseClick: Function;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  tile: {
    '&:hover': {
      cursor: 'pointer',
    },
  }
}));

function ClickableTile({ index, onMouseClick }: Props) {
  const tileSetName = useSelector((state: RootState) => state.tileSet);
  const tile = useSelector((state: RootState) => state.canvas.present.tileMap[index]);
  const columns = useSelector((state: RootState) => state.canvas.present.width);
  const tileSet = tileSets[tileSetName];
  const mapping = tileSet.mapping;

  const classes = useStyles();

  const color = () => {
    const tileValue = (index % columns) + Math.floor(index / columns);
    //console.log('index', index, 'tileValue', tileValue);
    return {
      color: tileValue % 2 === 0 ? 'GREY' : 'WHITE',
      width: tileSet.tileWidth,
      height: tileSet.tileHeight
    }
  }

  return (
    <div
      key={index}
      onMouseDown={() => onMouseClick()}
      className={classes.tile}
    >
      {tile >= 0 && <Tile {...mapping[tile]} />}
      {tile === -1 && <Tile {...color()} />}
    </div>
  )
}

export default ClickableTile;