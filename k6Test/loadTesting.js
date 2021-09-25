const http = require('k6/http');
const { sleep, check } = require('k6');
const { Counter, Trend } = require('k6/metrics');
const { getRandomInt } = require('../../server/helpers.js');

export const requests = new Counter('http_reqs');

export const options = {
  scenarios: {
    one_req_per_sec: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '30s',
      gracefulStop: '5s',
      preAllocatedVUs: 1,
      maxVUs: 10,
    },
    ten_req_per_sec: {
      executor: 'constant-arrival-rate',
      startTime: '30s',
      rate: 10,
      timeUnit: '1s',
      duration: '30s',
      gracefulStop: '5s',
      preAllocatedVUs: 10,
      maxVUs: 100,
    },
    one_hundred_req_per_sec: {
      executor: 'constant-arrival-rate',
      startTime: '60s',
      rate: 100,
      timeUnit: '1s',
      duration: '30s',
      gracefulStop: '5s',
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
    two_hundred_fifty_req_per_sec: {
      executor: 'constant-arrival-rate',
      startTime: '90s',
      rate: 250,
      timeUnit: '1s',
      duration: '30s',
      gracefulStop: '5s',
      preAllocatedVUs: 250,
      maxVUs: 500,
    },
    five_hundred_req_per_sec: {
      executor: 'constant-arrival-rate',
      startTime: '120s',
      rate: 500,
      timeUnit: '1s',
      duration: '30s',
      gracefulStop: '5s',
      preAllocatedVUs: 500,
      maxVUs: 1000,
    },
    one_thousand_req_per_sec: {
      executor: 'constant-arrival-rate',
      startTime: '150s',
      rate: 1000,
      timeUnit: '1s',
      duration: '30s',
      gracefulStop: '5s',
      preAllocatedVUs: 1500,
      maxVUs: 3000,
    },
    ramping_requests_one_to_one_thousand: {
      executor: 'ramping-arrival-rate',
      startTime: '180s',
      startRate: 1,
      timeUnit: '1s',
      stages: [
        { target: 1, duration: '10s' },
        { target: 10, duration: '5s' },
        { target: 10, duration: '10s' },
        { target: 100, duration: '5s' },
        { target: 100, duration: '25s' },
        { target: 1000, duration: '5s' },
        { target: 1000, duration: '30s' },
      ],
      gracefulStop: '5s',
      preAllocatedVUs: 10,
      maxVUs: 3000,
    }
  },
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)', 'count'],
  thresholds: {}
};

for (let key in options.scenarios) {
  let thresholdName = `http_req_duration{scenario:${key}}`;
  if (!options.thresholds[thresholdName]) {
    options.thresholds[thresholdName] = [];
  }
  options.thresholds[thresholdName].push('max>=0');
}

http.setResponseCallback(http.expectedStatuses(200, 404));

export default () => {
  const id = getRandomInt(1000000);
  const response = http.get(`http://localhost:4000/qa/questions?product_id=${id}`);
  check(response, {
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
  sleep(1 + Math.random());
};
