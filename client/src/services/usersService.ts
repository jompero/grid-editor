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
  return axios.get(`${url}/api/users`)
    .then((response) => {
      Debug('users', response.data);
      return response.data;
    });
}

export default getAll;