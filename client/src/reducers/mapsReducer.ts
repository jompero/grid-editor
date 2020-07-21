import Maps, { TileMap } from '../services/mapsService';
import GridEditorThunk from '../utils/GridEditorThunk';
import { notify } from './notificationsReducer';
import Debug from '../utils/Debug';

interface MapAction {
  type: string,
  data?: {
    maps?: TileMap[],
    map?: TileMap
  }
}

function mapsReducer(state: TileMap[] = [], action: MapAction) {
  switch (action.type) {
    case 'SET_MAPS': {
      return action.data?.maps ? action.data.maps : state;
    }
    case 'DELETE_MAP': {
      const deletedMapId = action.data?.map?.id;
      return deletedMapId ? state.filter((map) => map.id !== deletedMapId) : state;
    }
    case 'SAVE_MAP': {
      const savedMap = action.data?.map;
      if (savedMap) {
        const index = state.reduce(
          (prevValue, map, i) => (map.id === savedMap.id ? i : prevValue),
          -1,
        );
        if (index >= 0) {
          return state.map((map, i) => (i === index ? savedMap : map));
        }
        return state.concat(savedMap);
      }
      return state;
    }
    case 'LIKE_MAP': {
      const likedMap = action.data?.map;
      if(!likedMap) return state;

      return state.map((map) => map.id !== likedMap.id ? map : likedMap);
    }
    default: {
      return state;
    }
  }
}

export function initializeMaps(): GridEditorThunk {
  return (dispatch) => {
    Maps.getAll()
      .then((maps) => {
        dispatch({
          type: 'SET_MAPS',
          data: {
            maps,
          },
        });
      })
      .catch((error) => {
        Debug(error);
        dispatch(notify('Something went wrong while loading maps.', 'error'));
      });
  };
}

export function setMaps(maps: TileMap[]) {
  return {
    type: 'SET_MAPS',
    data: {
      maps,
    },
  };
}

export function deleteMap(map: TileMap) {
  return {
    type: 'DELETE_MAP',
    data: {
      map,
    },
  };
}

export function appendMap(map: TileMap) {
  return {
    type: 'SAVE_MAP',
    data: {
      map,
    },
  };
}

export function likeMap(id: string, token: string): GridEditorThunk {
  return (dispatch) => {
    Maps.likeMap(id, token)
      .then((map) => {
        dispatch({
          type: 'LIKE_MAP',
          data: {
            map,
          },
        });
      })
      .catch((error) => {
        Debug(error);
        dispatch(notify('Something went wrong while liking the map.', 'error'));
      });
  };
}

export default mapsReducer;
