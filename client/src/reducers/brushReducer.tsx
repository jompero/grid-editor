export interface BrushState {
  brush: number
}

interface BrushAction {
  type: string,
  data: {
    brush: number
  }
}

const initialState: BrushState = {
  brush: 0,
};

function setTile(state: BrushState, brush: number): BrushState {
  const newState = { ...state, brush };
  return newState;
}

function brushReducer(state: BrushState = initialState, action: BrushAction): BrushState {
  switch (action.type) {
    case 'SET_BRUSH':
      return setTile(state, action.data.brush);
    default:
      return state;
  }
}

export function setBrush(brush: number): BrushAction {
  return {
    type: 'SET_BRUSH',
    data: { brush },
  };
}

export default brushReducer;
