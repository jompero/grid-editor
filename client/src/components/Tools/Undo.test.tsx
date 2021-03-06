import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Undo from './Undo';

test('renders content', () => {
  const component = render(
    <Provider store={store}>
      <Undo />
    </Provider>,
  );

  const icon = component.getByTestId('undo-icon');

  expect(component.container).toContainElement(icon);
});
