import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Tools from '../Tools';
import store from '../../store';

test('renders tools', () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <Tools />
      </Router>
    </Provider>,
  );

  expect(component.container).toHaveTextContent(
    'Eraser',
  );
  expect(component.container).toHaveTextContent(
    'Undo',
  );
  expect(component.container).toHaveTextContent(
    'Redo',
  );
});
