import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import canvasReducer, { paintTile } from './canvasReducer';

const mockStore = configureStore([]);

describe('on action', () => {
  test('tile is painted', () => {
    const store = mockStore({});
    store.dispatch(paintTile(0, 1));

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'SET_TILE',
      data: { target: { index: 0, tile: 1 } },
    }]);
  });
});

describe('reducer', () => {
  const store = createStore(canvasReducer);

  test('is initialized', () => {
    const state = store.getState();
    expect(state.height).toBe(16);
    expect(state.width).toBe(16);
    expect(state.name).toBe('New Map');
    expect(state.tileSet).toBe('Harbour');
    expect(state.tileMap.length).toBe(16 * 16);
  });

  test('can be painted on', () => {
    store.dispatch(paintTile(0, 1));
    const state = store.getState();
    expect(state.tileMap[0]).toBe(1);
  });
});
