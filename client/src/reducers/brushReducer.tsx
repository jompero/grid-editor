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
    brush: 0
}

function BrushReducer(state: BrushState = initialState, action: BrushAction): BrushState {
    switch(action.type) {
      case 'SET': 
        return setTile(state, action.data.brush);
      default:
        return state
    }
  }

function setTile(state: BrushState, tile: number): BrushState {
    const newState = { ...state, tile };
    return newState;
}

export function setBrush(brush: number): BrushAction {
    return {
        type: 'SET',
        data: { brush }
      }
}

export default BrushReducer;