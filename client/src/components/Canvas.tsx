import * as React from 'react';
import { paintTile } from '../reducers/tileArrayReducer';
import { useSelector, useDispatch } from 'react-redux';
import Grid from './Grid';
import image from '../9445.png';
import mapping from '../9445.json';
import Tile from './Tile';
import { RootState } from '../store';

interface Props {
  width: number,
  height: number,
  tileHeight?: number,
  tileWidth?: number,
}

function Canvas({ width, height, tileHeight, tileWidth }: Props) {
    const dispatch = useDispatch();
    const tileArray = useSelector((state: RootState) => state.tileArray);
    const brush = useSelector((state: RootState) => state.tools.brush);

    function paint(index: number) {
      dispatch(paintTile(index, brush));
      console.log('painting', brush, 'on', index);
    }

    function parseTileArray() {
        return tileArray.history[tileArray.current].tiles.map((t: number, i: number) => {
          return (
            <div 
              key={i} 
              //onClick={() => paint(i)}
              onMouseDown={() => paint(i)}
              onMouseEnter={(event) =>  { 
                event.nativeEvent.which === 1 && paint(i);
              }} 
            >
              {t >= 0 && <Tile image={image} posX={mapping[t]['x']} posY={mapping[t]['y']} />}
              {t === -1 && <Tile color={getColor(i, width, height)}/>}
            </div>
          )
        });
      }
    return (
        <Grid columns={width ? width : 16} rows={height ? height : 16} tileHeight={tileHeight ? tileHeight : 16} tileWidth={tileWidth ? tileWidth : 16} scale={2} >
            {parseTileArray()}
        </Grid>
    );
}

function getColor(index: number, columns: number, rows: number): string {
  const tileValue = (index % columns) + Math.floor(index / rows);
  console.log('index', index, 'tileValue', tileValue);
  return tileValue % 2 === 0 ? 'GREY' : 'WHITE';
}

export default Canvas;
