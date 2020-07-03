import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import themeReducer, { toggleDarkMode } from './themeReducer';

const mockStore = configureStore([]);

describe('on action', () => {
  
  test('toggleDarkMode, theme is toggled', () => {
    const store = mockStore({});
    store.dispatch(toggleDarkMode('dark'));

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'CHANGE_THEME',
      data: 'dark',
    }]);
  });
});

describe('reducer', () => {
  const store = createStore(themeReducer);

  test('is initialized', () => {
    const state = store.getState();
    expect(state).toStrictEqual('light');
  });

  test('changes theme', () => {
    store.dispatch(toggleDarkMode('dark'));
    const state = store.getState();
    expect(state).toBe('dark');
  });
});
