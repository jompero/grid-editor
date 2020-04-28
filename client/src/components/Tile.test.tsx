import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import Tile from './Tile';
import image from '../9445.png';

test('style applied correctly', () => {
  const component = render(
    <Provider store={store}>
      <Tile image={image} color='blue' posX={10} posY={10}/>
    </Provider>
  );

  const tile = component.container.querySelector('.tile') || undefined;
  console.log(prettyDOM(tile));

  expect(tile).toHaveStyle(
    'background-image: url(9445.png)'
  );
  expect(tile).toHaveStyle(
    'background-color: blue'
  );
  expect(tile).toHaveStyle(
    'background-position: -10px -10px'
  );
});