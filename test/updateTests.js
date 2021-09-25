const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const { Product } = require('../database/mongo/models/product.js');
const { addQuestion, addAnswer, reportQuestion, reportAnswer, markQuestionHelpful, markAnswerHelpful } = require('../database/mongo/controllers/controllers.js');
const { testData } = require('./testData.js');

beforeEach((done) => {
  const product = new Product({
    _id: 0,
    questions: [
      {
        id: 0,
        productId: 0,
        body: 'test',
        dateWritten: (new Date).getTime(),
        askerName: 'test',
        askerEmail: 'test@test.com',
        reported: 0,
        helpful: 0,
        answers: [
          {
            photos: [],
            id: 0,
            questionId: 0,
            body: 'test',
            dateWritten: (new Date).getTime(),
            askerName: 'test',
            askerEmail: 'test',
            reported: 0,
            helpful: 0
          }
        ]
      }
    ]
  });
  product.save()
    .then(() => done());
});

describe('Updating documents', () => {
  it('adds a new question to a document', (done) => {
    const questionData = {
      id: 1,
      productId: 0,
      body: 'test',
      dateWritten: (new Date).getTime(),
      askerName: 'test',
      askerEmail: 'test@test.com',
      reported: 0,
      helpful: 1,
      answers: []
    };

    addQuestion(0, questionData)
      .then((record) => {
        expect(record.modifiedCount).to.equal(1);
        done();
      });
  });

  it('adds a new answer to a document', (done) => {
    const answerData = {
      photos: [],
      id: 1,
      questionId: 0,
      body: 'test',
      dateWritten: (new Date).getTime(),
      askerName: 'test',
      askerEmail: 'test',
      reported: 0,
      helpful: 0
    };

    addAnswer(0, answerData)
      .then((record) => {
        expect(record.modifiedCount).to.equal(1);
        done();
      });
  });

  it('reports a question', (done) => {
    reportQuestion(0)
      .then(() => {
        Product.find({ _id: 0 })
          .then((record) => {
            const reportVal = record[0].questions[0].reported;
            expect(reportVal).to.equal(1);
            done();
          });
      });
  });

  it('marks a question as helpful', (done) => {
    markQuestionHelpful(0)
      .then(() => {
        Product.find({ _id: 0 })
          .then((record) => {
            const helpfulVal = record[0].questions[0].helpful;
            expect(helpfulVal).to.equal(1);
            done();
          });
      });
  });

  it('reports an answer', (done) => {
    reportAnswer(0)
      .then(() => {
        Product.find({ _id: 0 })
          .then((record) => {
            const reportVal = record[0].questions[0].answers[0].reported;
            expect(reportVal).to.equal(1);
            done();
          });
      });
  });

  it('marks an answer as helpful', (done) => {
    markAnswerHelpful(0)
      .then(() => {
        Product.find({ _id: 0 })
          .then((record) => {
            const helpfulVal = record[0].questions[0].answers[0].helpful;
            expect(helpfulVal).to.equal(1);
            done();
          });
      });
  });
});