const filterOutReportedQuestions = (doc) => {
  let questions = [];
  for (let i = 0; i < doc.questions.length; i ++) {
    let question = doc.questions[i];
    const answers = filterOutReportedAnswers(question);
    if (question.reported === 0) {
      try {
        questions.push({
          'question_id': question.id,
          'question_body': question.body,
          'question_date': new Date(question.dateWritten).toISOString(),
          'asker_name': question.askerName,
          'question_helpfulness': question.helpful,
          'reported': false,
          'answers': answers
        });
      } catch (err) {
        console.log(`error occurred for question at: ${doc.product_id}`);
      }
    }
  }
  return questions;
};

const filterOutReportedAnswers = (question) => {
  let answers = {};
  for (let i = 0; i < question.answers.length; i++) {
    let answer = question.answers[i];
    if (answer.reported === 0) {
      try {
        answers[answer.id] = {
          'id': answer.id,
          'body': answer.body,
          'date': new Date(answer.dateWritten).toISOString(),
          'answerer_name': answer.askerName,
          'helpfulness': answer.helpful,
          'photos': answer.photos
        };
      } catch (err) {
        console.log(`error occurred for question at ${question.id}`);
      }
    }
  }

  return answers;
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * ( max ? max : 9990000000 ));
};

module.exports = {
  filterOutReported: filterOutReportedQuestions,
  getRandomInt: getRandomInt
};