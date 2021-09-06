// packages
const fs = require('fs');
const { parseFile } = require('fast-csv');

// file paths
const answers = './csvs/answers.csv';
const answersPhotos = './csvs/answers_photos.csv';
const questions = './csvs/questions.csv';

// temp storage
let records = []; // { _id: 0, questions: [] }
let questionIds = {}; // { 0: { p: 0, i: 0 }}
let answerIds = {}; // { 0: { q: 0, i: 0 }}

// mongodb import function
const { importRecords } = require('../index.js');

// set new headers and set options
const questionHeaders = ['id', 'productId', 'body', 'dateWritten', 'askerName', 'askerEmail', 'reported', 'helpful'];
const questionOptions = { headers: questionHeaders, renameHeaders: true, maxRows: 50 };

const answerHeaders = ['id', 'questionId', 'body', 'dateWritten', 'askerName', 'askerEmail', 'reported', 'helpful'];
const answerOptions = { headers: answerHeaders, renameHeaders: true, maxRows: 13 };

const answerPhotoHeaders = ['id', 'answerId', 'url'];
const answerPhotoOptions = { headers: answerPhotoHeaders, renameHeaders: true, maxRows: 10 };

// add a question to the records hash
const loadQuestion = (row) => {
  let id = row.productId;
  let record = records[id];
  if (records[id]) {
    questionIds[row.id] = { pId: id, index: record.questions.length };
    record.questions.push(row);
  } else {
    questionIds[row.id] = { pId: id, index: 0 };
    records[id] = { _id: id, questions: [row] };
  }
};

// add an answer to the records hash
const loadAnswer = (row) => {
  let qId = row.questionId;
  let { pId, index } = questionIds[qId];
  let question = records[pId].questions[index];
  if (row.id % 150000 === 0) {
    console.log(`Loaded: ${row.id}`);
  }
  if (questions.answers) {
    answerIds[row.id] = { qId: row.id, aIndex: questions.answers.length };
    question.answers.push(row);
  } else {
    answerIds[row.id] = { qId: qId, aIndex: 0 };
    question.answers = [row];
  }
};

// add photos to answers in records hash
const loadAnswerPhotos = (row) => {
  let aId = row.answerId;
  let { qId, aIndex } = answerIds[aId];
  let { pId, index } = questionIds[qId];
  let answer = records[pId].questions[index].answers[aIndex];
  if (answer.photos) {
    answer.photos.push(row.url);
  } else {
    answer.photos = [row.url];
  }
};

// load db
let qParser = parseFile(questions, questionOptions)
  .on('error', error => console.error(error))
  .on('headers', () => console.time())
  .on('data', row => loadQuestion(row))
  .on('end', rowCount => {
    console.log('questions loaded in:');
    console.timeEnd();
    console.time();
    let aParser = parseFile(answers, answerOptions)
      .on('error', error => console.error(error))
      .on('data', row => loadAnswer(row))
      .on('end', rowCount => {
        console.log('answers loaded in:');
        console.timeEnd();
        console.time();
        let aParser = parseFile(answersPhotos, answerPhotoOptions)
          .on('error', error => console.error(error))
          .on('data', row => loadAnswerPhotos(row))
          .on('end', rowCount => {
            console.log('answer photos loaded in:');
            console.timeEnd();
            importRecords(records);
          });
      });
  });
