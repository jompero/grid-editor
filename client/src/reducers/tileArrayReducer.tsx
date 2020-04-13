import { TileArray } from "../types/TileArray";

interface TileArrayAction {
    type: string,
    data: {
        index: number,
        tile: number
    }
}

const tileArrayReducer = (state: TileArray = new TileArray(new Array(16*16).fill(0)), action: TileArrayAction) => {
    switch(action.type) {
      case 'SET': return paint(state, action.data.index, action.data.tile);
      default:
      return state;
    }
  }

function paint(state: TileArray, index: number, tile: number): TileArray {
    const newMap = state.tiles.map((oldTile, i) => i !== index ? oldTile : tile);
    return new TileArray(newMap);
}

export function paintTile(index: number, tile: number) {
  return {
    type: 'SET',
    data: { index, tile }
  }
}

export default tileArrayReducer;