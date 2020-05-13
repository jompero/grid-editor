import image from '../9445.png';

export interface TileSetAction {
    type: string,
    data: {
        image: string
    }
}

function tileSetReducer(state: string = image, action: TileSetAction) {
    switch (action.type) {
        case 'LOAD_TILESET':
          return image;
        default:
          return state;
      }
}

export function loadTileSet(image: string) {
    return {
        type: 'LOAD_TILESET',
        data: { image },
      };
}

export default tileSetReducer;