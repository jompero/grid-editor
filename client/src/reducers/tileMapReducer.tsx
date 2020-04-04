import { TileArray } from "../types/TileArray";

interface TileMapAction {
    type: string,
    data: {
        index: number,
        tile: number
    }
}

const tileMapReducer = (state: TileArray = new TileArray(new Array(16*16).fill(0)), action: TileMapAction) => {
    switch(action.type) {
      case 'PAINT': return paint(state, action.data.index, action.data.tile);
      case 'ERASE': return paint(state, action.data.index, -1);
      default:
      return state
    }
  }

function paint(state: TileArray, index: number, tile: number): TileArray {
    const newMap = state.tiles.map((oldTile, i) => i !== index ? oldTile : tile);
    return new TileArray(newMap);
}

export function paintTile(index: number, tile: number) {
  return {
    type: 'PAINT',
    data: { index, tile }
  }
}

export default tileMapReducer;