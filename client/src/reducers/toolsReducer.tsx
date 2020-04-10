export interface ToolsState {
    tile: number
}

interface ToolsAction {
    type: string,
    data: {
        tile: number
    }
}

const initialState: ToolsState = {
    tile: 0
}

function ToolsReducer(state: ToolsState = initialState, action: ToolsAction): ToolsState {
    switch(action.type) {
      case 'SET_TILE': return setTile(state, action.data.tile);
      default:
      return state
    }
  }

function setTile(state: ToolsState, tile: number): ToolsState {
    const newState = { ...state, tile };
    return newState;
}

export default ToolsReducer;