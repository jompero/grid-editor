import '@testing-library/jest-dom/extend-expect';
import brushReducer, { setBrush } from './brushReducer';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';

const mockStore = configureStore([]);

describe('on action', () => {
    test('brush is changed', () => {
        const store = mockStore({});
        store.dispatch(setBrush(-1));
    
        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'SET_BRUSH', data: { brush: -1 }}]);
    });
});

describe('reducer', () => {
    const store = createStore(brushReducer);

    test('is initialized', () => {
        const state = store.getState();
        expect(state).toEqual({ brush: 0 });
    });

    test('can change brush', () => {
        store.dispatch(setBrush(1));
        const state = store.getState();
        expect(state.brush).toBe(1);
    });
});
