import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Debug from '../utils/Debug';

export interface Props {
  rows: number,
  columns: number,
  tileHeight: number,
  tileWidth: number,
  scale: number,
  children: React.ReactNode
}

function Grid({
  children, columns, rows, tileHeight, tileWidth, scale,
}: Props) {
  Debug('columns', columns, 'rows', rows);

  const useStyles = makeStyles(() => createStyles({
    gridContainer: {
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${columns}, ${tileWidth * scale}px [col-start])`,
      gridTemplateRows: `repeat(${rows}, ${tileHeight * scale}px [row-start])`,
    },
    children: {
      transformOrigin: 'top left',
      transform: `scale(${scale})`,
    },
  }));

  const classes = useStyles();

  function styledChildren(): any {
    return React.Children.map(children, (child) => <div className={classes.children}>{child}</div>);
  }

  return (
        <div className={classes.gridContainer}>
            {styledChildren()}
        </div>
  );
}

export default Grid;
