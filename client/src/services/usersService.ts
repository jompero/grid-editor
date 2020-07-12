import axios from 'axios';
import Debug from '../utils/Debug';

export interface User {
  name: string,
  id?: string,
  token: string,
  profile: string
}

export const NoUser = {
  name: '',
  token: '',
  profile: '',
};

const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'https://mysterious-meadow-32567.herokuapp.com';

export function getAll(): Promise<any> {
  return axios.get(`${url}/api/users`)
    .then((response) => {
      Debug('users', response.data);
      return response.data;
    });
}

export default getAll;
