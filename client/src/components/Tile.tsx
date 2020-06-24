import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

export interface Props {
  image?: string;
  color?: string;
  posX?: number;
  posY?: number;
  width: number;
  height: number;
}

function Tile({
  image, color, posX, posY, width, height,
}: Props) {
  const useStyles = makeStyles((theme: Theme) => createStyles({
    tile: {
      backgroundImage: `url(${image})`,
      backgroundColor: `${color}`,
      backgroundPosition: `-${posX}px -${posY}px`,
      width,
      height,
      imageRendering: 'pixelated',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.tile} />
  );
}

export default Tile;
