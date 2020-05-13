import TileArray from '../types/TileArray';
import { DBTileMap } from '../services/maps';
import Tile from '../components/Tile';

export interface TileArrayState {
  history: TileArray[],
  current: number
}

interface TileArrayAction {
  type: string,
  data?: {
    index?: number,
    tile?: number,
    tileMap?: TileArrayState
  }
}

const initializeState = () => {
  const initialArray = new TileArray(new Array(16 * 16).fill(-1));
  return {
    history: [initialArray],
    current: 0,
  };
};

function paint(state: TileArrayState, index: number, tile: number): TileArrayState {
  const { tiles } = state.history[state.current];
  const newArray = tiles.map((oldTile, i) => (i !== index ? oldTile : tile));
  const history = [...state.history.slice(0, state.current + 1), new TileArray(newArray)];
  const current = state.current + 1;
  return { history, current };
}

function tileArrayReducer(
  state: TileArrayState = initializeState(),
  action: TileArrayAction,
): TileArrayState {
  if (!action.data) return state;
  switch (action.type) {
    case 'LOAD_MAP':
      return action.data.tileMap ? action.data.tileMap : state;
    case 'SET_TILE':
      return action.data.index && action.data.tile ? paint(state, action.data.index, action.data.tile) : state;
    case 'UNDO':
      if (state.current === 0) return state;
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
    data: { index, tile },
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
  const tileArray = new TileArray(map.tileMap);
  console.log('loading', tileArray);

  return {
    type: 'LOAD_MAP',
    data: {
      tileMap: {
        history: [tileArray],
        current: 0
      }
    }
  }
}

export default tileArrayReducer;
