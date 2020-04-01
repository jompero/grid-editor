import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

interface TileMap extends Array<number> { }

interface TileMapAction {
    type: string,
    data: {
        index: number,
        tile: number
    }
}

const tileMapReducer = (state: TileMap, action: TileMapAction) => {
    switch(action.type) {
      case 'PAINT': return paint(state, action.data.index, action.data.tile);
      case 'ERASE': return paint(state, action.data.index, -1);
      default:
      return state
    }
  }

function paint(state: TileMap, index: number, tile: number): TileMap {
    const newMap = state.map((oldTile, i) => i !== index ? oldTile : tile);
    return newMap;
}

export default tileMapReducer;