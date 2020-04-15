interface HistoryAction {
    type: string,
    data: Array<number>
}

function historyReducer(state: Array<Array<number>> = [], action: HistoryAction) {
    switch(action.type) {
        case 'ADD_HISTORY': 
          return state.push(action.data);
        default:
          return state
      }
}

export default historyReducer;