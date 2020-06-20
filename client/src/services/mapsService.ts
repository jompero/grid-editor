import axios from 'axios';
import { User } from '../reducers/userReducer';

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
};

export function getAll(): Promise<any> {
    return axios.get(`${url}/api/maps`)
      .then(function (response) {
        console.log('maps', response.data);
        return response.data;
      });
};

export function saveMap(map: TileMap, token: string): Promise<any> {
  console.log(token);
  const headers = {
    'Authorization': `bearer ${token}`,
  }

  if (map.id) {
    return axios.put(`${url}/api/maps/${map.id}`, map, { headers: headers })
    .then(function (response) {
      console.log('maps', response);
      return response.data;
    });
  }

  return axios.post(`${url}/api/maps`, map, { headers: headers })
    .then(function (response) {
      console.log('maps', response);
      return response.data;
    });
};

export function deleteMap(id: string): Promise<any> {
  return axios.delete(`${url}/api/maps/${id}`)
    .then(function (response) {
      console.log('deleted', response);
      return response.data;
    })
}

export default { getAll, saveMap, deleteMap };