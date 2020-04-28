import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BrushReducer, { setBrush } from './brushReducer';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';

const mockStore = configureStore([]);

describe('action', () => {
    test('setBrush is called', () => {
        const store = mockStore({});
        store.dispatch(setBrush(-1));
    
        const actions = store.getActions();
        expect(actions).toEqual([{ type: 'SET_BRUSH', data: { brush: -1 }}]);
    });
})

test('brush initializes', () => {
    const store = createStore(BrushReducer);
    store.replaceReducer(BrushReducer);
    const state = store.getState();
    expect(state).toEqual({ brush: 0 });
});

