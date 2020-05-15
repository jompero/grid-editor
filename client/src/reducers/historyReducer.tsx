import { DBTileMap, TileMap } from '../services/maps';

export interface HistoryState {
  tileMap: TileMap,
  history: number[][],
  current: number
}

interface HistoryAction {
  type: string,
  data?: {
    target: {
      index: number,
      tile: number
    }
    tileMap?: TileMap
  }
}

const nullState = {
  tileMap: {
    name: "null",
    width: 0,
    height: 0,
    tileMap: []
  },
  history: [[-1]],
  current: 0
}

const newState = (map: TileMap) => {
  return {
    tileMap: map,
    history: [map.tileMap],
    current: 0,
  };
};

function paint(state: HistoryState, position: number, newTile: number): HistoryState {
  const currentMap = state.history[state.current];
  const newMap = currentMap.map((oldTile, index) => (index === position ? newTile : oldTile));
  const history = [...state.history.slice(0, state.current + 1), newMap];
  const current = state.current + 1;
  return { ...state, history, current };
}

function historyReducer(state: HistoryState = nullState as any, action: HistoryAction): HistoryState {
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
    default:
      return state;
  }
}

export function paintTile(index: number, tile: number) {
  return {
    type: 'SET_TILE',
    data: {
      target: {
        index, tile
      }
    },
  };
}

export function undo() {
  return {
    type: 'UNDO',
  };
}

export function redo() {
  return {
    type: 'REDO',
  };
}

export function load(map: DBTileMap) {
  return {
    type: 'LOAD_MAP',
    data: {
      tileMap: map
    }
  }
}

export default historyReducer;
