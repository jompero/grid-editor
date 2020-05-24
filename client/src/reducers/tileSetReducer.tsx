import image from '../tileSets/9445.png';
import tileSets, { TileSet } from '../services/tileSets';

export interface TileSetAction {
    type: string,
    data: {
        tileSet: string
    }
}

function tileSetReducer(state: TileSet = tileSets.City, action: TileSetAction) {
    switch (action.type) {
        case 'SET_TILESET':
          return action.data.tileSet;
        default:
          return state;
      }
}

export function setTileSet(tileSet: string) {
    return {
        type: 'SET_TILESET',
        data: { tileSet: tileSets[tileSet] }
      };
}

export default tileSetReducer;