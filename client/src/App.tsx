import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from './components/Grid'
import Tile from './components/Tile';
import Palette from './components/Palette';
import TileMap from './components/TileMap';
import image from './9445.png';
import mapping from './9445.json';
import { useState } from 'react';

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
    toolbarMargin: theme.mixins.toolbar,
  })
);

function App() {

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [tile, setTile] = useState(0);
  const [tileMap, setTileMap] = useState(new Array(30*20).fill(0));

  function paint(index: number): void {
    const newMap = tileMap.map((oldT, i) => i !== index ? oldT : tile);
    setTileMap(newMap);
  }

  function palette(): any {
    return mapping.map((coordinate, index) => <div key={index} onClick={() => setTile(index)}><Tile image={image} posX={coordinate.x} posY={coordinate.y} /></div>);
  }

  function parseTileMap(): any {
    return tileMap.map((t, i) => {
      return (
        <div 
          key={i} 
          onClick={() => paint(i)}
          onMouseDown={() => paint(i)}
          onMouseEnter={(event) =>  { 
            event.nativeEvent.which === 1 && paint(i);
          }} 
        >
          <Tile image={image} posX={mapping[t]['x']} posY={mapping[t]['y']} />
        </div>
      )
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Grid Editor
          </Typography>
          <div onClick={() => setOpen(true)}>
            <Grid columns={1} rows={1} tileHeight={16} tileWidth={16} scale={3} >
              <Tile image={image} posX={mapping[tile]['x']} posY={mapping[tile]['y']} />
            </Grid>
          </div>
        </Toolbar>
      </AppBar>

      <div>
        <div className={classes.toolbarMargin} />
        <TileMap width={30} height={20}>
          {parseTileMap()}
        </TileMap>

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