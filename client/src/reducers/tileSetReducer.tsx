import tileSets, { TileSet } from '../services/tileSets';
import { Props as TileProps } from '../components/Tile';
import getMapping from '../utils/tileMapping';

export interface TileSetAction {
    type: string,
    data: {
        tileSet: string
    }
}

export interface TileSetState {
    tileSet: TileSet,
    tileProps: TileProps[];
}

function newState(tileSet: TileSet): TileSetState {
    return {
        tileSet: tileSet,
        tileProps: getMapping(tileSet),
    }
}

function tileSetReducer(state: TileSetState = newState(tileSets.Harbour), action: TileSetAction) {
    switch (action.type) {
        case 'SET_TILESET':
          return action.data.tileSet || state;
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