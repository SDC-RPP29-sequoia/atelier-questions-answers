const { parseFile } = require('fast-csv');
const { getFileAsObject, updateFile } = require('./fsHelpers.js');
const path = require('path');

// STORAGE FOR WHERE TO READ FROM / WRITE TO
// Section parameters
let records = []; // { _id: 0, questions: [] };
let questionIds = {}; // { 0: { p: 0, i: 0 }}
let answerIds = {}; // { 0: { q: 0, i: 0 }}
let section = 0;
const numSections = 50000;

///////////////////////////
/// TRANSFORM QUESTIONS ///
///////////////////////////
const questionPath = path.resolve(__dirname, '../../csvs/questions.csv');
const questionOptions = {
  headers: ['id', 'productId', 'body', 'dateWritten', 'askerName', 'askerEmail', 'reported', 'helpful'],
  renameHeaders: true
  // maxRows: 50
};
const questionTransform = (row) => ({
  id: parseInt(row.id),
  productId: parseInt(row.productId),
  body: row.body,
  dateWritten: parseInt(row.dateWritten),
  askerName: row.askerName,
  askerEmail: row.askerEmail,
  reported: parseInt(row.reported),
  helpful: parseInt(row.helpful)
});

// CB TO USE ON QUESTION ROW READ
const questionOnRead = (row) => {
  // get the product id
  let id = row.productId;

  // only read save / read file if the current row is in a different section
  let currentSection = Math.floor(id / numSections);
  if (currentSection !== section) {
    console.log(`switching from section ${section} to section ${currentSection}`);
    updateFile(section, records);
    section = currentSection;
    records = getFileAsObject(section);
  }

  // get the index to the proper record
  let index = ( currentSection * numSections ) + parseInt(id);
  let record = records[index];

  // save question to records
  if (record) {
    questionIds[row.id] = { pId: id, index: record.questions.length };
    record.questions.push(row);
  } else {
    questionIds[row.id] = { pId: id, index: 0 };
    records[index] = { _id: id, questions: [row] };
  }
};

/////////////////////////
/// TRANSFORM ANSWERS ///
/////////////////////////
const answerPath = path.resolve(__dirname, '../../csvs/answers.csv');
const answerOptions = {
  headers: ['id', 'questionId', 'body', 'dateWritten', 'askerName', 'askerEmail', 'reported', 'helpful'],
  renameHeaders: true
  // maxRows: 13
};
const answerTransform = (row) => ({
  id: parseInt(row.id),
  questionId: parseInt(row.questionId),
  body: row.body,
  dateWritten: parseInt(row.dateWritten),
  askerName: row.askerName,
  askerEmail: row.askerEmail,
  reported: parseInt(row.reported),
  helpful: parseInt(row.helpful)
});

// CB TO USE ON ANSWER ROW READ
const answerOnRead = (row) => {
  let qId = row.questionId;
  // check if right file is loaded if not load right one

  let { pId, index } = questionIds[qId];

  // only read save / read file if the current row is in a different section
  let currentSection = Math.floor(pId / numSections);
  if (currentSection !== section) {
    console.log(`switching from section ${section} to section ${currentSection}`);
    updateFile(section, records);
    section = currentSection;
    records = getFileAsObject(section);
  }

  // get the index to the proper record
  let pIndex = ( currentSection * numSections ) + parseInt(pId);
  let question = records[pIndex].questions[index];

  // save answer to records
  if (question.answers) {
    answerIds[row.id] = { qId: qId, aIndex: question.answers.length };
    question.answers.push(row);
  } else {
    answerIds[row.id] = { qId: qId, aIndex: 0 };
    question.answers = [row];
  }
};

////////////////////////
/// TRANSFORM PHOTOS ///
////////////////////////
const answerPhotoPath = path.resolve(__dirname, '../../csvs/answers_photos.csv');
const answerPhotoOptions = {
  headers: ['id', 'answerId', 'url'],
  renameHeaders: true
  // maxRows: 10
};
const answerPhotoTransform = (row) => ({
  id: parseInt(row.id),
  answerId: parseInt(row.answerId),
  url: row.url
});

// CB TO USE ON ANSWERPHOTO ROW READ
const answerPhotoOnRead = (row) => {
  let aId = row.answerId;
  let { qId, aIndex } = answerIds[aId];
  let { pId, index } = questionIds[qId];

  // only read save / read file if the current row is in a different section
  let currentSection = Math.floor(pId / numSections);
  if (currentSection !== section) {
    console.log(`switching from section ${section} to section ${currentSection}`);
    updateFile(section, records);
    section = currentSection;
    records = getFileAsObject(section);
  }

  // get the index to the proper record
  let pIndex = ( currentSection * numSections ) + parseInt(pId);
  let answer = records[pIndex].questions[index].answers[aIndex];

  // save photos
  if (answer.photos) {
    answer.photos.push(row.url);
  } else {
    answer.photos = [row.url];
  }
};

// CREATE A READ STREAM AND TRANSFORM DATA INTO JSON
console.time('total time');
parseFile(questionPath, questionOptions)
  .transform(questionTransform)
  .on('error', error => console.error(error))
  .on('data', (row) => questionOnRead(row))
  .on('end', rowCount => {
    // final update on end
    updateFile(section, records);
    console.log('questions transformed');
    console.timeLog('total time');
    parseFile(answerPath, answerOptions)
      .transform(answerTransform)
      .on('error', error => console.error(error))
      .on('data', (row) => answerOnRead(row))
      .on('end', rowCount => {
        // final update on end
        updateFile(section, records);
        console.log('answers transformed');
        console.timeLog('total time');
        parseFile(answerPhotoPath, answerPhotoOptions)
          .transform(answerPhotoTransform)
          .on('error', error => console.error(error))
          .on('data', (row) => answerPhotoOnRead(row))
          .on('end', rowCount => {
            // final update on end
            updateFile(section, records);
            console.log('answers photos transformed');
            console.timeLog('total time');
          });
      });
  });
