import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Tools from '../Tools';
import { Provider } from 'react-redux';
import store from '../../store';

test('renders tools', () => {
  const component = render(
    <Provider store={store}>
      <Tools />
    </Provider>
  );

  expect(component.container).toHaveTextContent(
    'Eraser'
  );
  expect(component.container).toHaveTextContent(
    'Undo'
  );
  expect(component.container).toHaveTextContent(
    'Redo'
  );
});