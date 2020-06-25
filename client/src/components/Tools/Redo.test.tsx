import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Redo from './Redo';

test('renders content', () => {
  const component = render(
    <Provider store={store}>
      <Redo />
    </Provider>,
  );

  const icon = component.getByTestId('redo-icon');

  expect(component.container).toContainElement(icon);
});
