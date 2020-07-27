import axios from 'axios';
import Debug from '../utils/Debug';
import { User } from './usersService';
import auth from '../utils/auth';

const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  :  process.env.REACT_APP_BASE_URL;

export interface TileMap {
  id?: string,
  name: string,
  width: number,
  height: number,
  tileMap: number[],
  tileSet: string,
  user: User,
  likes?: string[]
}

export function getAll(): Promise<any> {
  return axios.get(`${url}/api/maps`)
    .then((response) => {
      Debug('maps', response.data);
      return response.data;
    });
}

export function saveMap(map: TileMap, token: string): Promise<any> {
  if (map.id) {
    return axios.put(`${url}/api/maps/${map.id}`, map, { headers: auth(token) })
      .then((response) => {
        Debug('maps', response);
        return response.data;
      });
  }

  return axios.post(`${url}/api/maps`, map, { headers: auth(token) })
    .then((response) => {
      Debug('maps', response);
      return response.data;
    });
}

export function deleteMap(id: string, token: string): Promise<any> {
  Debug('deleting map');

  return axios.delete(`${url}/api/maps/${id}`, { headers: auth(token) })
    .then((response) => {
      Debug('deleted', response);
      return response.data;
    });
}

export function likeMap(id:string, token: string): Promise<any> {
  Debug('liking map: ', id);

  return axios.post(`${url}/api/maps/${id}/like`, null, { headers: auth(token) })
  .then((response) => {
    Debug('liked', response);
    return response.data;
  });
}

export function unlikeMap(id:string, token: string): Promise<any> {
  Debug('unliking map: ', id);

  return axios.post(`${url}/api/maps/${id}/unlike`, null, { headers: auth(token) })
  .then((response) => {
    Debug('unliked', response);
    return response.data;
  });
}

export default { getAll, saveMap, deleteMap, likeMap, unlikeMap };
