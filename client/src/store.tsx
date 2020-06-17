import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import canvasReducer from './reducers/canvasReducer';
import brushReducer, { BrushState } from './reducers/brushReducer';
import tileSetReducer from './reducers/tileSetReducer';
import mapsReducer from './reducers/mapsReducer';
import { TileMap } from './services/mapsService';
import userReducer, { User } from './reducers/userReducer';
import thunk from 'redux-thunk'
import undoable, { StateWithHistory } from 'redux-undo';
import notificationsReducer, { NotificationsState } from './reducers/notificationsReducer';

export interface RootState {
  user: User,
  tileSet: string,
  canvas: StateWithHistory<TileMap>,
  tools: BrushState,
  maps: TileMap[],
  notification: NotificationsState
}

const reducer = combineReducers({
  user: userReducer,
  tileSet: tileSetReducer,
  canvas: undoable(canvasReducer),
  tools: brushReducer,
  maps: mapsReducer,
  notification: notificationsReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ));
console.log('store', store.getState());

export default store;
