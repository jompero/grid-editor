import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import canvasReducer, { CanvasState } from './reducers/canvasReducer';
import brushReducer, { BrushState } from './reducers/brushReducer';
import tileSetReducer, { TileSetState } from './reducers/tileSetReducer';
import mapsReducer from './reducers/mapsReducer';
import { TileMap } from './services/mapsService';
import userReducer, { User } from './reducers/userReducer';
import thunk from 'redux-thunk'

export interface RootState {
  user: User,
  tileSet: TileSetState,
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

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ));
console.log('store', store.getState());

export default store;
