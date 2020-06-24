import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import canvasReducer, { paintTile, undo, redo } from './canvasReducer';
import Debug from '../utils/Debug';

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

  test('last action is undone', () => {
    const store = mockStore({});
    store.dispatch(undo());

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'UNDO',
    }]);
  });

  test('last action is redone', () => {
    const store = mockStore({});
    store.dispatch(redo());

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'REDO',
    }]);
  });
});

describe('reducer', () => {
  const store = createStore(canvasReducer);

  test('is initialized', () => {
    const state = store.getState();
    expect(state.current).toBe(0);
    expect(state.history.length).toBe(1);
    expect(state.history[0].length).toBe(1);
  });

  test('can be painted on', () => {
    store.dispatch(paintTile(0, 1));
    const state = store.getState();
    expect(state.current).toBe(1);
    expect(state.history[1][0]).toBe(1);
  });

  test('can undo', () => {
    store.dispatch(undo());
    const state = store.getState();
    expect(state.current).toBe(0);
    expect(state.history[0][0]).toBe(-1);
  });

  test('cannot undo further than first state', () => {
    store.dispatch(undo());
    const state = store.getState();
    expect(state.current).toBe(0);
    expect(state.history[0][0]).toBe(-1);
  });

  test('can redo', () => {
    store.dispatch(redo());
    const state = store.getState();
    expect(state.current).toBe(1);
    expect(state.history[1][0]).toBe(1);
  });

  test('cannot redo further than the last state', () => {
    store.dispatch(redo());
    const state = store.getState();
    Debug('state', state);
    expect(state.current).toBe(1);
    expect(state.history[1][0]).toBe(1);
  });
});
