import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import undoable, { StateWithHistory } from 'redux-undo';
import canvasReducer from './reducers/canvasReducer';
import brushReducer, { BrushState } from './reducers/brushReducer';
import tileSetReducer from './reducers/tileSetReducer';
import mapsReducer from './reducers/mapsReducer';
import { TileMap } from './services/mapsService';
import userReducer from './reducers/userReducer';
import notificationsReducer, { NotificationsState } from './reducers/notificationsReducer';
import themeReducer from './reducers/themeReducer';
import Debug from './utils/Debug';
import { User } from './services/usersService';
import mapsFilterReducer, { MapsFilterState } from './reducers/mapsFilterReducer';

export interface RootState {
  user: User,
  tileSet: string,
  canvas: StateWithHistory<TileMap>,
  tools: BrushState,
  maps: TileMap[],
  mapsFilter: MapsFilterState,
  notification: NotificationsState,
  theme: 'dark' | 'light'
}

const reducer = combineReducers({
  user: userReducer,
  tileSet: tileSetReducer,
  canvas: undoable(canvasReducer),
  tools: brushReducer,
  maps: mapsReducer,
  mapsFilter: mapsFilterReducer,
  notification: notificationsReducer,
  theme: themeReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
Debug('store', store.getState());

export default store;
