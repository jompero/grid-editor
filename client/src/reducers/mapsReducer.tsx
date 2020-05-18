import { TileMap } from "../services/maps";

interface MapAction {
    type: string,
    data: {
        map: TileMap
    }
}

function mapsReducer(state: TileMap[] = [], action: MapAction) {
    switch (action.type) {
        case 'SAVE_MAP':
          return state.concat(action.data.map);
        default:
          return state;
      }
}

export function appendMap(map: TileMap) {
    return {
        type: 'SAVE_MAP',
        data: {
            map
        }
    }
}

export default mapsReducer;