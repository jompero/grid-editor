import { TileMap } from '../services/mapsService';

export interface CanvasState {
  tileMap: TileMap,
  history: number[][],
  current: number
}

interface CanvasAction {
  type: string,
  data?: {
    target: {
      index: number,
      tile: number
    }
    tileMap?: TileMap,
    name?: string
  }
}

const nullState = {
  tileMap: {
    name: "New Map",
    width: 16,
    height: 16,
    tileMap: []
  },
  history: [new Array(16*16).fill(-1)],
  current: 0
}

const newState = (map: TileMap) => {
  return {
    tileMap: map,
    history: [map.tileMap],
    current: 0,
  };
};

function paint(state: CanvasState, position: number, newTile: number): CanvasState {
  const currentMap = state.history[state.current];
  const newMap = currentMap.map((oldTile, index) => (index === position ? newTile : oldTile));
  const history = [...state.history.slice(0, state.current + 1), newMap];
  const current = state.current + 1;
  return { ...state, history, current };
};

function canvasReducer(state: CanvasState = nullState as any, action: CanvasAction): CanvasState {
  switch (action.type) {
    case 'LOAD_MAP':
      return action.data?.tileMap ? newState(action.data.tileMap) : state;
    case 'SET_TILE':
      return action.data?.target ? paint(state, action.data.target.index, action.data.target.tile) : state;
    case 'UNDO':
      if (state.current === 0) return state;
      console.log('didnt undo');
      return { ...state, current: state.current - 1 };
    case 'REDO':
      if (state.current === state.history.length - 1) return state;
      return { ...state, current: state.current + 1 };
    case 'UPDATE_MAP':
      const updatedTileMap = action.data?.tileMap;
      if (!updatedTileMap) return state;

      console.log('updating tilemap', updatedTileMap);
      let history = state.history;
      let current = state.current;
      if (updatedTileMap.width !== state.tileMap.width || updatedTileMap.height !== state.tileMap.height) {
        history = [new Array(updatedTileMap.width * updatedTileMap.height).fill(-1)];
        current = 0;
      }
      return { ...state, tileMap: updatedTileMap, history, current };
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

export function undo() {
  return {
    type: 'UNDO',
  };
};

export function redo() {
  return {
    type: 'REDO',
  };
};

export function load(map: TileMap) {
  return {
    type: 'LOAD_MAP',
    data: {
      tileMap: map
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
