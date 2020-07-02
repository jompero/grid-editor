import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import tileSetReducer, { setTileSet } from './tileSetReducer';

const mockStore = configureStore([]);

describe('on action', () => {
  
  test('set, tile set is changed', () => {
    const store = mockStore({});
    store.dispatch(setTileSet('Cave'));

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'SET_TILESET',
      data: { tileSet: 'Cave' },
    }]);
  });
});

describe('reducer', () => {
  const store = createStore(tileSetReducer);

  test('is initialized', () => {
    const state = store.getState();
    expect(state).toStrictEqual('Harbour');
  });

  test('changes tile set', () => {
    store.dispatch(setTileSet('Cave'));
    const state = store.getState();
    expect(state).toBe('Cave');
  });
});
