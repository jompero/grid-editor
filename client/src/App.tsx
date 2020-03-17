import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Grid from './components/Grid'
import Tile from './components/Tile';
import Palette from './components/Palette';
import TileMap from './components/TileMap';
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

  function parseTileMap(): any {
    return tileMap.map((t, i) => {
      return (
        <div onClick={() => setTileMap(tileMap.map((oldT, index) => index !== i ? oldT : tile))}>
          <Tile image={image} posX={mapping[t]['x']} posY={mapping[t]['y']} />
        </div>
      )
    });
  }

  const titleStyle = {
    flexGrow: 1
  }

  return (
    <div className="App">
      
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" style={titleStyle}>
            Grid Editor
          </Typography>
          <div onClick={() => setOpen(true)}>
            <Grid columns={1} rows={1} tileHeight={16} tileWidth={16} scale={3} >
              <Tile image={image} posX={mapping[tile]['x']} posY={mapping[tile]['y']} />
            </Grid>
          </div>
        </Toolbar>
      </AppBar>

      <TileMap width={8} height={3}>
        {parseTileMap()}
      </TileMap>

      <Palette setOpen={setOpen} open={open}>
        {palette()}
      </Palette>

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