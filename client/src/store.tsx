import { createStore, combineReducers } from 'redux';
import tileArrayReducer, { HistoryState } from './reducers/historyReducer';
import brushReducer, { BrushState } from './reducers/brushReducer';
import tileSetReducer from './reducers/tileSetReducer';

export interface RootState {
  tileSet: string,
  history: HistoryState,
  tools: BrushState
}

const reducer = combineReducers({
  tileSet: tileSetReducer,
  history: tileArrayReducer,
  tools: brushReducer,
});

const store = createStore(reducer);
console.log('store', store.getState());

export default store;
