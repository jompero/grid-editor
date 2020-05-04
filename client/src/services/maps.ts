import axios from 'axios';

const url = 'http://localhost:3001';

function getMaps(): any {
    axios.get(`${url}/maps`)
      .then(function (response) {
        return response;
      });
}

export default getMaps;