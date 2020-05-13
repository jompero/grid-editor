import { createStore, combineReducers } from 'redux';
import tileArrayReducer, { TileArrayState } from './reducers/tileArrayReducer';
import brushReducer, { BrushState } from './reducers/brushReducer';
import tileSetReducer from './reducers/tileSetReducer';

export interface RootState {
  tileSet: string,
  tileArray: TileArrayState,
  tools: BrushState
}

const reducer = combineReducers({
  tileSet: tileSetReducer,
  tileArray: tileArrayReducer,
  tools: brushReducer,
});

const store = createStore(reducer);
console.log('store', store.getState());

export default store;
