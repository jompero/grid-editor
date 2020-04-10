import { createStore, combineReducers } from 'redux';
import tileArrayReducer from './reducers/tileArrayReducer';
import ToolsReducer, { ToolsState } from './reducers/toolsReducer';
import { TileArray } from './types/TileArray';

export interface RootState {
  tileArray: TileArray,
  tools: ToolsState
}

const reducer = combineReducers({
    tileArray: tileArrayReducer,
    tools: ToolsReducer
  });

const store = createStore(reducer);
console.log('store', store.getState());

export default store;