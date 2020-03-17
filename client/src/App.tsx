import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer } from '@material-ui/core';
import Grid from './components/Grid'
import Tile from './components/Tile';
import image from './9445.png';
import mapping from './9445.json';
import { useState } from 'react';

function App() {

  const [open, setOpen] = useState(false);
  const [tile, setTile] = useState(0);
  const [tileMap, setTileMap] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  function palette(): any {
    return mapping.map((coordinate, index) => <div onClick={() => setTile(index)}><Tile image={image} posX={coordinate['x']} posY={coordinate['y']} /></div>);
  }

  function drawTileMap(): any {
    return tileMap.map((t, i) => {
      return (
        <div onClick={() => setTileMap(tileMap.map((oldT, index) => index !== i ? oldT : tile))}>
          <Tile image={image} posX={mapping[t]['x']} posY={mapping[t]['y']} />
        </div>
      )
    });
  }

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">
            Grid Editor
          </Typography>
          <Button onClick={() => setOpen(true)}>Open Palette</Button>
          Selected tile: {tile}
        </Toolbar>
      </AppBar>

      <Grid columns={4} rows={6} tileHeight={16} tileWidth={16} scale={5} >
        {drawTileMap()}
      </Grid>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Grid columns={5} rows={3} tileHeight={17} tileWidth={17} scale={3} >
            {palette()}
          </Grid>
      </Drawer>

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