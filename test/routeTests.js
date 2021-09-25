const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = 'http://localhost:4000';

// specify to use the testing db
process.env.TESTING = true;

describe('Get Routes', () => {
  it('gets questions for a specified product', (done) => {
    const query = 'product_id=0&page=1&count=1';
    chai.request('http://localhost:4000')
      .get(`/qa/questions?${query}`)
      .end((err, res) => {
        expect(res.body.results.length).to.be.greaterThan(0);
        done();
      });
  });

  it('returns a status 200 when a product does exist', (done) => {
    const query = 'product_id=0&page=1&count=1';
    chai.request(app)
      .get(`/qa/questions?${query}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('returns a status 404 when a product does not exist', (done) => {
    const query = 'product_id=999999999&page=1&count=1';
    chai.request(app)
      .get(`/qa/questions?${query}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Post Routes', () => {
  const questionData = {
    product_id: 0,
    body: 'test',
    name: 'test',
    email: 'test@test.com'
  };

  const answerData = {
    question_id: 0,
    body: 'test',
    name: 'test',
    email: 'test',
  };

  const empty = {};

  it('returns a status 201 when a question post is successful', (done) => {
    chai.request(app)
      .post('/qa/questions')
      .type('json')
      .send(questionData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('returns a status 401 when a question post is unsuccessful', (done) => {
    chai.request(app)
      .post('/qa/questions')
      .type('json')
      .send(empty)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('returns a status 201 when an answer post is successful', (done) => {
    chai.request(app)
      .post('/qa/questions/0/answers')
      .type('json')
      .send(answerData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('returns a status 401 when an answer post is unsuccessful', (done) => {
    chai.request(app)
      .post('/qa/questions/0/answers')
      .type('json')
      .send(empty)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Put Routes', () => {
  it('returns a status 204 when a question helpfulness put is successful', (done) => {
    chai.request(app)
      .put('/qa/questions/0/helpful')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('returns a status 401 when a question helpfulness put is unsuccessful', (done) => {
    chai.request(app)
      .put('/qa/questions/999999999/helpful')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('returns a status 204 when an answer helpfulness put is successful', (done) => {
    chai.request(app)
      .put('/qa/answers/0/helpful')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('returns a status 401 when an answer helpfulness put is unsuccessful', function(done) {
    this.timeout(10000);
    chai.request(app)
      .put('/qa/answers/999999999/helpful')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('returns a status 204 when a question is successfully reported', (done) => {
    chai.request(app)
      .put('/qa/questions/0/report')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('returns a status 401 when a question report is unsuccessful', (done) => {
    chai.request(app)
      .put('/qa/questions/999999999/report')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('returns a status 204 when an answer is successfully reported', (done) => {
    chai.request(app)
      .put('/qa/answers/0/report')
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });

  it('returns a status 401 when an answer report is unsuccessful', function(done) {
    this.timeout(10000);
    chai.request(app)
      .put('/qa/answers/999999999/report')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

// resume use of the normal db
process.env.TESTING = false;