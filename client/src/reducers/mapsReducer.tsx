import { TileMap } from "../services/maps";

interface MapAction {
    type: string,
    data?: {
        map?: TileMap,
        maps?: TileMap
    }
}

function mapsReducer(state: TileMap[] = [], action: MapAction) {
    switch (action.type) {
        case 'SET_MAPS':
          return action.data?.maps ? action.data.maps : state;
        case 'SAVE_MAP':
          return action.data?.map ? state.concat(action.data.map) : state;
        default:
          return state;
      }
}

export function setMaps(maps: TileMap[]) {
    return {
      type: 'SET_MAPS',
      data: {
          maps
      }
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