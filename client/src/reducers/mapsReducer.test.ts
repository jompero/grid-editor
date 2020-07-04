import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import mapsReducer, { initializeMaps, setMaps, deleteMap, appendMap } from './mapsReducer';
import { User } from './userReducer';
import mapsService, { TileMap } from '../services/mapsService';
import thunk from 'redux-thunk';

jest.mock('../services/mapsService');
const mockStore = configureStore([ thunk ]);

// id?: string,
// name: string,
// width: number,
// height: number,
// tileMap: number[],
// tileSet: string,
// user?: User,

const users: User[] = [
  {
    name: 'tester1',
    id: 'a',
    token: 'tokenstring',
    profile: 'profilestring'
  },
  {
    name: 'tester2',
    id: 'b',
    token: 'tokenstring',
    profile: 'profilestring'
  }
]

const testMaps: TileMap[] = [
  {
    id: '1',
    name: 'testMap1',
    width: 2,
    height: 2,
    tileMap: [ 0, 1, 2, 3 ],
    tileSet: 'Harbour',
    user: users[0]
  },
  {
    id: '2',
    name: 'testMap2',
    width: 2,
    height: 2,
    tileMap: [ 0, 1, 2, 3 ],
    tileSet: 'Cave',
    user: users[1]
  },
]

describe('on action', () => {
  test('setMaps, maps are set', () => {
    const store = mockStore({});
    
    store.dispatch(setMaps(testMaps));

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'SET_MAPS',
      data: {
        maps: testMaps
      }
    }]);
  });

  test('initializeMaps, maps are fetched from the server', () => {
    const store = mockStore({});
    mapsService.getAll.mockImplementation(() => Promise.resolve({ ...testMaps }));
    
    store.dispatch(initializeMaps());

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'SET_MAPS',
      data: { ...testMaps }
    }]);
  });

  test('deleteMap, map is removed', () => {
    const store = mockStore({});

    store.dispatch(deleteMap(testMaps[0]));
    const actions = store.getActions();

    expect(actions).toEqual([{
      type: 'DELETE_MAP',
      data: { map: testMaps[0] }
    }]);
  })

  test('appendMap, map is added', () => {
    const store = mockStore({});

    store.dispatch(appendMap(testMaps[0]));
    const actions = store.getActions();

    expect(actions).toEqual([{
      type: 'SAVE_MAP',
      data: {
        map: testMaps[0]
      }
    }])
  })
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
      testMaps
    );
  });

  test('saves a map', () => {
    const store = createStore(mapsReducer);
    store.dispatch(setMaps(testMaps));

    store.dispatch(appendMap(testMaps[0]))
    const state = store.getState();
    expect(state).toStrictEqual(
      [ ...testMaps ]
    )
  });

  test('deletes a map', () => {
    const store = createStore(mapsReducer);
    store.dispatch(setMaps(testMaps));

    store.dispatch(deleteMap(testMaps[0]))
    const state = store.getState();
    expect(state).toStrictEqual(
      [ testMaps[1] ]
    )
  });

  test('saves a new map', () => {
    const store = createStore(mapsReducer);

    store.dispatch(appendMap(testMaps[0]))
    const state = store.getState();
    expect(state).toStrictEqual(
      [ testMaps[0] ]
    )
  });
});
