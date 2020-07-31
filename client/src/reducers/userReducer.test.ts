import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import userReducer, { login, logout } from './userReducer';
import users from '../../testProps/users.json'; // eslint-disable-line import/extensions
import thunk from 'redux-thunk';
import GridEditorThunk from '../utils/GridEditorThunk';
import axiosMock from 'jest-mock-axios';

const mockStore = configureStore<{}, GridEditorThunk>([thunk]);

describe('on action', () => {
  test('login, user is logged in', async () => {
    const store = mockStore({});
    await store.dispatch(login(users[0]));
    axiosMock.mockResponse({ data: users[0] });

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'LOGIN',
      data: users[0],
    }]);
  });

  test('logout, user is logged out', () => {
    const store = mockStore({});
    store.dispatch(logout());

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'LOGOUT',
    }]);
  });
});

describe('reducer', () => {
  const store = createStore(userReducer);

  const loggedOut = {
    name: '',
    profile: '',
    token: '',
  };

  test('is initialized', () => {
    const state = store.getState();
    expect(state).toStrictEqual(loggedOut);
  });

  test('can log in', async () => {
    await store.dispatch(login(users[0]));
    axiosMock.mockResponse({ data: users[0] });
    
    const state = store.getState();
    expect(state).toBe(users[0]);
  });

  test('can log out', () => {
    store.dispatch(logout());
    const state = store.getState();
    expect(state).toStrictEqual(loggedOut);
  });
});
