import axios from 'axios';

const url = 'http://localhost:3001';

function getMaps(): Promise<any> {
    return axios.get(`${url}/api/maps`)
      .then(function (response) {
        console.log('maps', response);
        return response.data;
      });
}

export default getMaps;