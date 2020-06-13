import * as React from 'react';
import Tile from './Tile';
import tileSets from '../services/tileSets';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export interface Props {
  index: number;
  tile: number;
  onMouseClick: Function;
  mouseDown: boolean;
  onMouseRelease: Function;
}

function ClickableTile({ index, tile, mouseDown, onMouseClick, onMouseRelease }: Props) {
  const tileSetName = useSelector((state: RootState) => state.tileSet);
  const columns = useSelector((state: RootState) => state.canvas.present.width);
  const tileSet = tileSets[tileSetName];
  const mapping = tileSet.mapping;

  const color = () => {
    const tileValue = (index % columns) + Math.floor(index / columns);
    //console.log('index', index, 'tileValue', tileValue);
    return {
      color: tileValue % 2 === 0 ? 'GREY' : 'WHITE',
      width: tileSet.tileWidth,
      height: tileSet.tileHeight
    }
  }

  return (
    <div
      key={index}
      onMouseDown={() => onMouseClick()}
      onMouseUp={() => onMouseRelease()}
      onMouseEnter={(event) => mouseDown && onMouseClick()}
    >
      {tile >= 0 && <Tile {...mapping[tile]} />}
      {tile === -1 && <Tile {...color()} />}
    </div>
  )
}

export default ClickableTile;