import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Tools from './Tools';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const middlewares: any[] = [];
const mockStore = configureStore(middlewares);

test('renders tools', () => {
  const store = mockStore({});

  const component = render(
    <Provider store={store}>
      <Tools />
    </Provider>
  );

  expect(component.container).toHaveTextContent(
    'Eraser'
  );
})