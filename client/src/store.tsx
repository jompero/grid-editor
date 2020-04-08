import { createStore, combineReducers } from 'redux';
import tileArrayReducer from './reducers/tileArrayReducer';
import { TileArray } from './types/TileArray';

export interface RootState {
  tileArray: TileArray
}

const reducer = combineReducers({
    tileArray: tileArrayReducer
  });

const store = createStore(reducer);
console.log('store', store.getState());

export default store;