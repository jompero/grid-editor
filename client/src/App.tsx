import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Grid from './components/Grid'
import Tile from './components/Tile';
import image from './9445.png';
import mapping from './9445.json';

function App() {

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">
            Grid Editor
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid columns={5} rows={3} tileHeight={32} tileWidth={32} >
        {tileMap()}
      </Grid>
    </div>
  );
}

export default App;

function tileMap(): any {
  let tiles = [];
  for (let i = 0; i < 15; i++) {
    let coordinate: Coordinate = mapping[i%4];
    tiles.push(<Tile image={image} posX={coordinate['x']} posY={coordinate['y']} />)
  }
  console.log(tiles)
  return tiles;
}

export interface Coordinate {
  x: number,
  y: number,
  height: number,
  width: number
}