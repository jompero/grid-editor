import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Tile from './components/Tile';
import image from './9445.png';

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
      {tileMap}
    </div>
  );
}

export default App;

function tileMap(): any {
  let tiles = [];
  for (let i = 0; i < 10; i++) {
    tiles.push(<Tile image={image} posX={i} posY={i} />)
  }
  return tiles;
}