import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import notificationsReducer, { notify, resetNotifications } from './notificationsReducer';

const mockStore = configureStore([]);

describe('on action', () => {
  test('notify, notification is set', () => {
    const store = mockStore({});
    
    store.dispatch(notify('message', 'success'));

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: 'NOTIFY',
      data: {
        message: 'message',
        severity: 'success'
      }
    }]);
  });

  test('reset, notification is removed', () => {
    const store = mockStore({});

    store.dispatch(resetNotifications());
    const actions = store.getActions();

    expect(actions).toEqual([{
      type: 'RESET_NOTIFICATION',
    }]);
  })
});

describe('reducer', () => {
  const store = createStore(notificationsReducer);

  test('is initialized', () => {
    const state = store.getState();
    expect(state).toStrictEqual({});
  });

  test('sets notification', () => {
    store.dispatch(notify('message', 'success'));
    const state = store.getState();
    expect(state).toStrictEqual({
      message:'message',
      severity: 'success'
    });
  });
});
