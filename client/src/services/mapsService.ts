import axios from 'axios';
import { User } from '../reducers/userReducer';
import Debug from '../utils/Debug';

const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'https://mysterious-meadow-32567.herokuapp.com';

export interface TileMap {
  id?: string,
  name: string,
  width: number,
  height: number,
  tileMap: number[],
  tileSet: string,
  user?: User,
}

export function getAll(): Promise<any> {
  return axios.get(`${url}/api/maps`)
    .then((response) => {
      Debug('maps', response.data);
      return response.data;
    });
}

export function saveMap(map: TileMap, token: string): Promise<any> {
  Debug(token);
  const headers = {
    Authorization: `bearer ${token}`,
  };

  if (map.id) {
    return axios.put(`${url}/api/maps/${map.id}`, map, { headers })
      .then((response) => {
        Debug('maps', response);
        return response.data;
      });
  }

  return axios.post(`${url}/api/maps`, map, { headers })
    .then((response) => {
      Debug('maps', response);
      return response.data;
    });
}

export function deleteMap(id: string, token: string): Promise<any> {
  const headers = {
    Authorization: `bearer ${token}`,
  };

  Debug('deleting map');

  return axios.delete(`${url}/api/maps/${id}`, { headers })
    .then((response) => {
      Debug('deleted', response);
      return response.data;
    });
}

export default { getAll, saveMap, deleteMap };
