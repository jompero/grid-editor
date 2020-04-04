import * as React from 'react';
import { connect } from 'react-redux'
import { paintTile } from '../reducers/tileMapReducer'
import Grid from './Grid';
import { TileArray } from '../types/TileArray';
import image from '../9445.png';
import mapping from '../9445.json';
import Tile from './Tile';

export interface Props {
    width: number,
    height: number,
    tileHeight?: number,
    tileWidth?: number,
    //children: React.ReactNode,
    tileArray: TileArray,
    paintTile: Function,
}

// const state: TileMap = new Array(16*16).fill(0);

function TileMap({ width, height, tileHeight, tileWidth, tileArray, paintTile }: Props) {
    function parseTileArray(): any {
        console.log('state', tileArray);
        return tileArray.tiles.map((t, i) => {
          return (
            <div 
              key={i} 
              onClick={() => paintTile(i, 5)}
              onMouseDown={() => paintTile(i, 5)}
              onMouseEnter={(event) =>  { 
                event.nativeEvent.which === 1 && paintTile(i, 5);
              }} 
            >
              <Tile image={image} posX={mapping[t]['x']} posY={mapping[t]['y']} />
            </div>
          )
        });
      }
    return (
        <Grid columns={width} rows={height} tileHeight={tileHeight ? tileHeight : 16} tileWidth={tileWidth ? tileWidth : 16} scale={2} >
            {parseTileArray()}
        </Grid>
    );
}

const mapState = (state: TileArray) => {
    return {
      tileArray: state
    }
}

const mapDispatch = {
    paintTile
}

export default connect(
        mapState,
        mapDispatch
    )(TileMap);
