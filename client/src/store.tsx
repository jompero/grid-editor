import { createStore, combineReducers } from 'redux';
import tileArrayReducer, { TileArrayState } from './reducers/tileArrayReducer';
import BrushReducer, { BrushState } from './reducers/brushReducer';

export interface RootState {
  tileArray: TileArrayState,
  tools: BrushState
}

const reducer = combineReducers({
    tileArray: tileArrayReducer,
    tools: BrushReducer
  });

const store = createStore(reducer);
console.log('store', store.getState());

export default store;