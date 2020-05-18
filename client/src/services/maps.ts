import axios from 'axios';
import { CardActions } from '@material-ui/core';

const url = 'http://localhost:3001';

export interface TileMap {
  id?: string,
  name: string,
  width: number,
  height: number,
  tileMap: number[]
};

export function getMaps(): Promise<any> {
    return axios.get(`${url}/api/maps`)
      .then(function (response) {
        console.log('maps', response);
        return response.data;
      });
};

export function saveMap(map: TileMap): Promise<any> {
  return axios.post(`${url}/api/maps`, map)
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

export default { getMaps, saveMap, deleteMap };