import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paintTile } from '../reducers/canvasReducer';
import Grid from './Grid';
import Tile from './Tile';
import { RootState } from '../store';
import mapping from '../9445.json';
import getTileProps from '../utils/tileMapping';

function getColor(index: number, columns: number): string {
  const tileValue = (index % columns) + Math.floor(index / columns);
  console.log('index', index, 'tileValue', tileValue);
  return tileValue % 2 === 0 ? 'GREY' : 'WHITE';
}

function Canvas() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: RootState) => state.canvas);
  const brush = useSelector((state: RootState) => state.tools.brush);
  const tileSet = useSelector((state: RootState) => state.tileSet);

  function paint(index: number) {
    dispatch(paintTile(index, brush));
    console.log('painting', brush, 'on', index);
  }

  function parseTileArray() {
    return canvas.history[canvas.current].map((tile: number, index: number) => (
            <div
              key={index}
              onMouseDown={() => paint(index)}
              onMouseEnter={(event) => event.nativeEvent.which === 1 && paint(index)}
            >
              {tile >= 0 && <Tile {...getTileProps(tile, tileSet)} />}
              {tile === -1 && <Tile color={getColor(index, canvas.tileMap.width)}/>}
            </div>
    ));
  }

  if (canvas.tileMap.width === 0) return null;

  return (
        <Grid
          columns={canvas.tileMap.width}
          rows={canvas.tileMap.height}
          tileHeight={16}
          tileWidth={16}
          scale={2} >
            {parseTileArray()}
        </Grid>
  );
}

export default Canvas;
