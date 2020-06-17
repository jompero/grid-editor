import { TileMap } from '../services/mapsService';

interface CanvasAction {
  type: string,
  data?: {
    target: {
      index: number,
      tile: number
    }
    tileMap?: TileMap,
  }
}

const nullState: TileMap = {
  name: 'New Map',
  width: 16,
  height: 16,
  tileSet: 'Harbour',
  tileMap: new Array(16*16).fill(-1)
}

function paint(state: TileMap, position: number, newTile: number): TileMap {
  const currentMap = state.tileMap;
  const newMap = currentMap.map((oldTile, index) => (index === position ? newTile : oldTile));
  return { ...state, tileMap: newMap };
};

function canvasReducer(state: TileMap = nullState as any, action: CanvasAction): TileMap {
  switch (action.type) {
    case 'LOAD_MAP':
      return action.data?.tileMap || state;
    case 'UPDATE_MAP':
      let newMap = action.data?.tileMap;
      if (newMap && (newMap.width !== state.width || newMap.height !== state.height)) {
        newMap = { ...newMap, tileMap: new Array(newMap.width * newMap.height).fill(-1) };
      }
      return newMap || state;
    case 'SET_TILE':
      return action.data?.target ? paint(state, action.data.target.index, action.data.target.tile) : state;
    default:
      return state;
  }
};

export function paintTile(index: number, tile: number) {
  return {
    type: 'SET_TILE',
    data: {
      target: {
        index, tile
      }
    },
  };
};

export function load(tileMap: TileMap) {
  return {
    type: 'LOAD_MAP',
    data: {
      tileMap
    }
  }
};

export function updateMap(map: TileMap) {
  return {
    type: 'UPDATE_MAP',
    data: {
      tileMap: map
    }
  }
}

export default canvasReducer;
