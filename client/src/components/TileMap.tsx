import * as React from 'react';
import { connect } from 'react-redux'
import { paintTile } from '../reducers/tileMapReducer'
import Grid from './Grid';
import { TileMap } from '../types/TileMap';
import image from '../9445.png';
import mapping from '../9445.json';
import Tile from './Tile';

export interface Props {
    width: number,
    height: number,
    tileHeight?: number,
    tileWidth?: number,
    //children: React.ReactNode,
    tileMap: TileMap,
    paintTile: Function,
}

const state: TileMap = new Array(16*16).fill(0);

function TileMap({ width, height, tileHeight, tileWidth, tileMap, paintTile }: Props) {
    function parseTileMap(): any {
        return tileMap.map((t, i) => {
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
            {parseTileMap()}
        </Grid>
    );
}

const mapState = (state: TileMap) => {
    return {
        tileMap: state
    }
}

const mapDispatch = {
    paintTile
}

export default connect(
        mapState,
        mapDispatch
    )(TileMap);
