import { createStore, combineReducers } from 'redux';
import tileMapReducer from './reducers/tileMapReducer';

const reducer = combineReducers({
    tileMap: tileMapReducer
  });

const store = createStore(reducer);

export default store;