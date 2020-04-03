import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from './components/Grid'
import Tile from './components/Tile';
import Palette from './components/Palette';
import TileMap from './components/TileMap';
import Circle from './components/Circle';
import { useState } from 'react';
import image from './9445.png';
import mapping from './9445.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      //width: 300,
      flexShrink: 0,
    },
    title: {
      flexGrow: 1,
    },
    content: {
      margin: 'auto'
    },
    toolbarMargin: theme.mixins.toolbar,
  })
);

function App() {

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [tile, setTile] = useState(0);

  function palette(): any {
    return mapping.map((coordinate: Coordinate, index: number) => <div key={index} onClick={() => setTile(index)}><Tile image={image} posX={coordinate.x} posY={coordinate.y} /></div>);
  }

  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Grid Editor
          </Typography>
          <div onClick={() => setOpen(true)}>
            <Circle>
              <Grid columns={1} rows={1} tileHeight={14} tileWidth={16} scale={2.5} >
                <Tile image={image} posX={mapping[tile]['x']} posY={mapping[tile]['y']} />
              </Grid>
            </Circle>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        <div className={classes.toolbarMargin} />
        <TileMap width={16} height={16} />

        <Palette setOpen={setOpen} open={open}>
          {palette()}
        </Palette>
      </div>

    </div>
  );
}

export default App;

export interface Coordinate {
  x: number,
  y: number,
  height: number,
  width: number
}