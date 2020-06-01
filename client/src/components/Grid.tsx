import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
  
  console.log('columns', columns, 'rows', rows)

  const useStyles = makeStyles((theme: Theme) => createStyles({
    gridContainer: {
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${columns}, ${tileWidth * scale}px [col-start])`,
      gridTemplateRows: `repeat(${rows}, ${tileHeight * scale}px [row-start])`,
    },
    children: {
      transformOrigin: 'top left',
      transform: `scale(${scale})`,
      '&:hover': { //TODO: It's not this component's responsibility to provide this behaviour
        cursor: 'pointer',
      },
    },
  }));

  const classes = useStyles();

  function styledChildren(): any {
    if (!children) return null;
    return React.Children.map(children, (child) => <div className={classes.children}>{child}</div>);
  }

  return (
        <div className={classes.gridContainer}>
            {styledChildren()}
        </div>
  );
}

export default Grid;
