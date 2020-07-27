import axios from 'axios';
import Debug from '../utils/Debug';
import auth from '../utils/auth';

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
  : process.env.REACT_APP_BASE_URL;

export function getAll(): Promise<any> {
  return axios.get(`${url}/api/users`)
    .then((response) => {
      Debug('users', response.data);
      return response.data;
    });
}

export function login(token: string) {
  return axios.post(`${url}/api/users/login`, null, { headers: auth(token) })
    .then((response) => {
      Debug('logging in as: ', response.data);
      return response.data;
    });
}

export default { getAll, login };
