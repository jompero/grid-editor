import TileArray from '../types/TileArray';

export interface TileArrayState {
  history: TileArray[],
  current: number
}

interface TileArrayAction {
  type: string,
  data: {
    index: number,
    tile: number
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
  const tiles = state.history[state.current].tiles;
  const newArray = tiles.map((oldTile, i) => i !== index ? oldTile : tile);
  const history = [...state.history.slice(0, state.current + 1), new TileArray(newArray)];
  const current = state.current + 1;
  return { history, current };
}

function tileArrayReducer(
  state: TileArrayState = initializeState(),
  action: TileArrayAction,
): TileArrayState {
  switch (action.type) {
    case 'SET_TILE':
      return paint(state, action.data.index, action.data.tile);
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

export default tileArrayReducer;
