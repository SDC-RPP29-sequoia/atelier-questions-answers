// CONTROLLERS
const {
  grabQuestions, grabAnswers,
  addQuestion, addAnswer,
  reportQuestion, reportAnswer,
  markQuestionHelpful, markAnswerHelpful,
} = require('../database/mongo/controllers/controllers.js');

// HELPER FUNCTIONS
const { filterOutReported, getRandomInt } = require('./helpers.js');

const getQuestions = (req, res) => {
  const { product_id, page, count } = req.query;
  grabQuestions(parseInt(product_id))
    .then(record => {
      const results = filterOutReported(record[0]);
      const filteredRecord = { product_id: record[0]._id, results: results };
      res.status(200).send(filteredRecord);
    })
    .catch(err => {
      console.log(err);
      res.status(400).end();
    });
};

const getAnswers = (req, res) => {
  const { page, count } = req.query;
  const { question_id } = req.body;
  grabAnswer(parseInt(question_id))
    .then((record) => {
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
      res.status(400).end();
    });
};

const postQuestion = (req, res) => {
  console.log(req.body);
  const { body, name, email, product_id } = req.body;
  const question = {
    id: getRandomInt(),
    productId: product_id,
    body: body,
    dateWritten: (new Date()).getTime(),
    answerName: name,
    askerEmail: email,
    reported: 0,
    helpful: 0,
    answers: []
  };

  addQuestion(product_id, question)
    .then((record) => {
      res.status(201).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(401).end();
    });
};

const postAnswer = (req, res) => {
  const { question_id } = req.params;
  const { body, name, email, photos } = req.body;
  const answer = {
    id: getRandomInt(),
    questionId: parseInt(question_id),
    body: body,
    dateWritten: (new Date).getTime(),
    askerName: name,
    askerEmail: email,
    reported: 0,
    helpful: 0,
    photos: photos ? photos : []
  };

  addAnswer(parseInt(question_id), answer)
    .then((record) => {
      res.status(201).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(401).end();
    });
};

const putQuestionHelpful = (req, res) => {
  const { question_id } = req.params;
  markQuestionHelpful(parseInt(question_id))
    .then((record) => {
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(401).end();
    });
};

const putQuestionReport = (req, res) => {
  const { question_id } = req.params;
  reportQuestion(parseInt(question_id))
    .then((record) => {
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(401).end();
    });
};

const putAnswerHelpful = (req, res) => {
  const { answer_id } = req.params;
  markAnswerHelpful(parseInt(answer_id))
    .then((record) => {
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(401).end();
    });
};

const putAnswerReport = (req, res) => {
  const { answer_id } = req.params;
  reportAnswer(parseInt(answer_id))
    .then((record) => {
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(401).end();
    });
};

module.exports = {
  getQuestions: getQuestions,
  getAnswers: getAnswers,
  postQuestion: postQuestion,
  postAnswer: postAnswer,
  putQuestionHelpful: putQuestionHelpful,
  putQuestionReport: putQuestionReport,
  putAnswerHelpful: putAnswerHelpful,
  putAnswerReport: putAnswerReport
};
