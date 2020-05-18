import { createStore, combineReducers } from 'redux';
import tileArrayReducer, { HistoryState } from './reducers/historyReducer';
import brushReducer, { BrushState } from './reducers/brushReducer';
import tileSetReducer from './reducers/tileSetReducer';
import mapsReducer from './reducers/mapsReducer';
import { TileMap } from './services/maps';

export interface RootState {
  tileSet: string,
  history: HistoryState,
  tools: BrushState,
  maps: TileMap[]
}

const reducer = combineReducers({
  tileSet: tileSetReducer,
  history: tileArrayReducer,
  tools: brushReducer,
  maps: mapsReducer
});

const store = createStore(reducer);
console.log('store', store.getState());

export default store;
