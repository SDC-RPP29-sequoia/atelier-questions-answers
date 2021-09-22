const filterOutReportedQuestions = (doc) => {
  let questions = [];
  doc.questions.forEach((question) => {
    const answers = filterOutReportedAnswers(question);
    try {
      if (question.reported === 0) {
        questions.push({
          'question_id': question.id,
          'question_body': question.body,
          'question_date': (new Date(question.dateWritten)).toISOString(),
          'asker_name': question.askerName,
          'question_helpfulness': question.helpful,
          'reported': false,
          'answers': answers
        });
      }
    } catch (err) {
      console.log('error occurred for question: ', question);
    }
  });
  return questions;
};

const filterOutReportedAnswers = (question) => {
  let answers = {};
  try {
    question.answers.forEach((answer) => {
      if (answer.reported === 0) {
        answers[answer.id] = {
          'id': answer.id,
          'body': answer.body,
          'date': (new Date(answer.dateWritten)).toISOString(),
          'answerer_name': answer.askerName,
          'helpfulness': answer.helpful,
          'photos': answer.photos
        };
      }
    });
  } catch (err) {
    console.log('error occurred for answer: ', answer);
  }
  return answers;
};

const getRandomInt = () => {
  return Math.floor(Math.random() * 9990000000);
};

module.exports = {
  filterOutReported: filterOutReportedQuestions,
  getRandomInt: getRandomInt
};