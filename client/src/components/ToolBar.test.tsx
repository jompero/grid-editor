import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ToolBar from './ToolBar';
import store from '../store';

test('renders tools', () => {
  const component = render(
    <Provider store={store}>
      <ToolBar>Content</ToolBar>
    </Provider>
  );

  expect(component.container).toHaveTextContent(
    'Eraser'
  );
});