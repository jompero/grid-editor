import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paintTile } from '../reducers/canvasReducer';
import Grid from './Grid';
import { RootState } from '../store';
import tileSets from '../services/tileSets';
import ClickableTile from './ClickableTile';

function Canvas() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: RootState) => state.canvas.present.tileMap);
  const { width, height } = useSelector((state: RootState) => state.canvas.present);
  const brush = useSelector((state: RootState) => state.tools.brush);
  const tileSetName = useSelector((state: RootState) => state.tileSet);
  const tileSet = tileSets[tileSetName];

  function paint(index: number) {
    dispatch(paintTile(index, brush));
  }

  function parseTileArray() {
    return canvas.map((tile: number, index: number) => (
      <ClickableTile key={index} index={index} onMouseClick={() => paint(index)} />
    ));
  }

  return (
        <Grid
          columns={width}
          rows={height}
          tileHeight={tileSet.tileHeight}
          tileWidth={tileSet.tileWidth}
          scale={32 / tileSet.tileWidth} >
            {parseTileArray()}
        </Grid>
  );
}

export default Canvas;
