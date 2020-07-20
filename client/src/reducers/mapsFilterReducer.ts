export interface MapsFilterState {
  text: string,
  users: string[]
}

interface MapsFilterAction {
  type: 'SET_FILTER',
  data: {
    text: string,
    users: string[]
  }
}

const initialState = {
  text: '',
  users: []
}

function mapsFilterReducer(state: MapsFilterState = initialState, action: MapsFilterAction): MapsFilterState {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data;
    default:
      return state;
  }
}

export function setFilter(filter: MapsFilterState): MapsFilterAction {
  return {
    type: 'SET_FILTER',
    data: filter
  }
}

export function resetFilter(): MapsFilterAction {
  return setFilter(initialState);
}

export default mapsFilterReducer;
