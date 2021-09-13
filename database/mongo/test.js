const db = require('./index.js');
const logRecord = (data) => {
  console.log(JSON.stringify(data, null, 2));
};

// db.addQuestion(10000, {
//   'id': 35191,
//   'productId': 10000,
//   'body': 'test',
//   'dateWritten': (new Date).getTime(),
//   'askerName': 'test',
//   'askerEmail': 'test@test.com',
//   'reported': 0,
//   'helpful': 1,
//   'answers': []
// });

// db.addAnswer(35191, {
//   'photos': [],
//   'id': 1234567890,
//   'questionId': 35191,
//   'body': 'test',
//   'dateWritten': (new Date).getTime(),
//   'askerName': 'test',
//   'askerEmail': 'test',
//   'reported': 0,
//   'helpful': 0
// });

// db.reportQuestion(35191);
// db.reportAnswer(123456);
// db.markQuestionHelpful(35191);
// db.markAnswerHelpful(1234567890);
// db.getQuestionsAndAnswers(10001, logRecord);