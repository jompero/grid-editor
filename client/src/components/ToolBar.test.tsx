import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ToolBar from './ToolBar';
import store from '../store';

test('renders content', () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <ToolBar>Content</ToolBar>
      </Router>
    </Provider>,
  );

  expect(component.container).toHaveTextContent(
    'Content',
  );
});
