const express = require('express');
const app = express();
const port = 3000;
const {
  getQuestions, getAnswers,
  postQuestion, postAnswer,
  putQuestionHelpful, putQuestionReport,
  putAnswerHelpful, putAnswerReport
} = require('./routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/qa/questions', getQuestions)
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