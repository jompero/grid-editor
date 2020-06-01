import tileSets from '../services/tileSets';
import { TileMap } from '../services/mapsService';

export interface TileSetAction {
  type: string,
  data: {
    tileSet?: string,
    tileMap?: TileMap
  }
}

function tileSetReducer(state: string = 'Harbour', action: TileSetAction) {
  switch (action.type) {
    case 'SET_TILESET':
      return action.data.tileSet || state;
    case 'LOAD_MAP':
    case 'UPDATE_MAP':
      console.log('TileSet', action.data);
      return action.data?.tileMap ? action.data.tileMap.tileSet : state;
    default:
      return state;
  }
}

export function setTileSet(tileSet: string) {
  return {
    type: 'SET_TILESET',
    data: { tileSet: tileSets.tileSet }
  };
}

export default tileSetReducer;