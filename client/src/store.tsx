import { createStore, combineReducers } from 'redux';
import tileArrayReducer from './reducers/tileArrayReducer';
import BrushReducer, { BrushState } from './reducers/brushReducer';
import { TileArray } from './types/TileArray';

export interface RootState {
  tileArray: TileArray,
  tools: BrushState
}

const reducer = combineReducers({
    tileArray: tileArrayReducer,
    tools: BrushReducer
  });

const store = createStore(reducer);
console.log('store', store.getState());

export default store;