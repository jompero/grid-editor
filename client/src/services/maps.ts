import axios from 'axios';

const url = 'http://localhost:3001';

export interface TileMap {
  id?: string,
  name: string,
  width: number,
  height: number,
  tileMap: number[]
}

export function getMaps(): Promise<any> {
    return axios.get(`${url}/api/maps`)
      .then(function (response) {
        console.log('maps', response);
        return response.data;
      });
}

export function saveMap(map: TileMap): Promise<any> {
  return axios.post(`${url}/api/maps`, map)
  .then(function (response) {
    console.log('maps', response);
    return response.data;
  });
}

export default { getMaps, saveMap };