const express = require('express');
const app = express();
const port = 4000;
const {
  getQuestions, getAnswers,
  postQuestion, postAnswer,
  putQuestionHelpful, putQuestionReport,
  putAnswerHelpful, putAnswerReport
} = require('./routes.js');

const redis = require('redis');
const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

// Cache middleware
const cache = (req, res, next) => {
  const { product_id } = req.query;
  client.get(product_id, (err, data) => {
    if (err) {
      throw err;
    }

    if (data !== null) {
      res.status(200).send(data);
    } else {
      next();
    }
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/qa/questions', cache, getQuestions)
  .get('/qa/questions/:question_id/answers', getAnswers)
  .post('/qa/questions', postQuestion)
  .post('/qa/questions/:question_id/answers', postAnswer)
  .put('/qa/questions/:question_id/helpful', putQuestionHelpful)
  .put('/qa/questions/:question_id/report', putQuestionReport)
  .put('/qa/answers/:answer_id/helpful', putAnswerHelpful)
  .put('/qa/answers/:answer_id/report', putAnswerReport);

app.listen(port, () => {
  console.log(`Everything is fine on port: ${port}`);
});

module.exports = {
  client: client
};