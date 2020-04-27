import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import Tile from './Tile';
import image from '../9445.png';

test('renders content', () => {
  const component = render(
    <Provider store={store}>
      <Tile image={image} posX={0} posY={0}/>
    </Provider>
  );

  const tile = component.container.querySelector('.tile') || undefined;
  console.log(prettyDOM(tile));

  expect(tile).toHaveStyle(
    'background-image: url(9445.png)'
  );
});