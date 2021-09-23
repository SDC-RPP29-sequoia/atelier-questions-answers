const http = require('k6/http');
const { sleep, check } = require('k6');
const { Counter } = require('k6/metrics');
const { getRandomInt } = require('../server/helpers.js');

export const requests = new Counter('http_reqs');

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'ramping-arrival-rate',
      // executor: 'constant-arrival-rate',
      startRate: 1,
      rate: 50,
      timeUnit: '1s',
      // duration: '30s',
      stages: [
        { target: 1, duration: '30s' },
        { target: 10, duration: '5s' },
        { target: 10, duration: '30s' },
        { target: 100, duration: '5s' },
        { target: 100, duration: '30s' },
        { target: 1000, duration: '5s' },
        { target: 1000, duration: '30s' },
      ],
      gracefulStop: '5s',
      preAllocatedVUs: 10,
      maxVUs: 3000,
    },
  }
};

export default () => {
  const id = getRandomInt(1000000);
  const response = http.get(`http://localhost:4000/qa/questions?product_id=${id}`);

  sleep(1);

  const checkResponse = check(response, {
    'status is 200 or 404': (res) => {
      return [404, 200].includes(res.status);
    },
    'response body': (res) => {
      if (res.status === 200) {
        return res.body.length > 0;
      }
      return true;
    }
  });
};
