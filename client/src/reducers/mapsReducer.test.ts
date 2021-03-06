import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import mapsReducer, { setMaps, deleteMap, appendMap } from './mapsReducer';
import testMaps from '../../testProps/maps.json'; // eslint-disable-line import/extensions

const mockStore = configureStore();

describe('on action', () => {
  test('setMaps, maps are set', () => {
    const store = mockStore({});

    store.dispatch(setMaps(testMaps));

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'SET_MAPS',
      data: {
        maps: testMaps,
      },
    }]);
  });

  test('deleteMap, map is removed', () => {
    const store = mockStore({});

    store.dispatch(deleteMap(testMaps[0]));
    const actions = store.getActions();

    expect(actions).toEqual([{
      type: 'DELETE_MAP',
      data: { map: testMaps[0] },
    }]);
  });

  test('appendMap, map is added', () => {
    const store = mockStore({});

    store.dispatch(appendMap(testMaps[0]));
    const actions = store.getActions();

    expect(actions).toEqual([{
      type: 'SAVE_MAP',
      data: {
        map: testMaps[0],
      },
    }]);
  });
});

describe('reducer', () => {
  test('is initialized', () => {
    const store = createStore(mapsReducer);

    const state = store.getState();
    expect(state).toStrictEqual([]);
  });

  test('sets maps', () => {
    const store = createStore(mapsReducer);

    store.dispatch(setMaps(testMaps));
    const state = store.getState();
    expect(state).toStrictEqual(
      testMaps,
    );
  });

  test('saves a map', () => {
    const store = createStore(mapsReducer);
    store.dispatch(setMaps(testMaps));

    store.dispatch(appendMap(testMaps[0]));
    const state = store.getState();
    expect(state).toStrictEqual(
      [...testMaps],
    );
  });

  test('deletes a map', () => {
    const store = createStore(mapsReducer);
    store.dispatch(setMaps(testMaps));

    store.dispatch(deleteMap(testMaps[0]));
    const state = store.getState();
    expect(state).toStrictEqual(
      [testMaps[1]],
    );
  });

  test('saves a new map', () => {
    const store = createStore(mapsReducer);

    store.dispatch(appendMap(testMaps[0]));
    const state = store.getState();
    expect(state).toStrictEqual(
      [testMaps[0]],
    );
  });
});
