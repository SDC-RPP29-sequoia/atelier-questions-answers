const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const { filterOutReported, getRandomInt } = require('../server/routeHelpers.js');
const { testData } = require('./testData.js');

describe('Route Helpers', () => {
  it('provides a random int for document ids', (done) => {
    const randomInt = getRandomInt();
    expect(randomInt).to.be.greaterThan(10000000);
    expect(randomInt).to.be.lessThan(9990000000);

    const randomIntLessThan = getRandomInt(100);
    expect(randomIntLessThan).to.be.lessThan(100);
    done();
  });

  it('removes reported questions and answers from results', (done) => {
    const filtered = filterOutReported(testData);
    expect(filtered.length).to.equal(1);
    should.exist(filtered[0].answers[0]);
    done();
  });
});