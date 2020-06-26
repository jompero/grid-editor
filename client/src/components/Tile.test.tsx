import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, prettyDOM } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import Tile from './Tile';
import image from '../tileSets/bw_tiles.png';
import Debug from '../utils/Debug';

test('style applied correctly', () => {
  const component = render(
    <Provider store={store}>
      <Tile width={16} height={16} image={image} color='blue' posX={10} posY={10}/>
    </Provider>,
  );

  const tile = component.getByTestId('tile');
  tile && Debug(prettyDOM(tile));

  expect(tile).toHaveStyle(
    'background-image: url(bw_tiles.png)',
  );
  expect(tile).toHaveStyle(
    'background-color: blue',
  );
  expect(tile).toHaveStyle(
    'background-position: -10px -10px',
  );
});
