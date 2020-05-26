import { createStore, combineReducers } from 'redux';
import canvasReducer, { CanvasState } from './reducers/canvasReducer';
import brushReducer, { BrushState } from './reducers/brushReducer';
import tileSetReducer from './reducers/tileSetReducer';
import mapsReducer from './reducers/mapsReducer';
import { TileMap } from './services/maps';
import { TileSet } from './services/tileSets';
import userReducer, { User } from './reducers/userReducer';

export interface RootState {
  user: User,
  tileSet: TileSet,
  canvas: CanvasState,
  tools: BrushState,
  maps: TileMap[]
}

const reducer = combineReducers({
  user: userReducer,
  tileSet: tileSetReducer,
  canvas: canvasReducer,
  tools: brushReducer,
  maps: mapsReducer
});

const store = createStore(reducer);
console.log('store', store.getState());

export default store;
