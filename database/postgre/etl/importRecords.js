// controller specifically for initial etl
// packages / modules / file paths
const { parseFile } = require('fast-csv');
const { User } = require('../models/user.js');
const { Question } = require ('../models/question.js');

// CREATE A READ STREAM AND LOAD EACH ROW INTO DB
const load = (skip, max, filepath, onRead, dataLabel) => {
  let parser = parseFile(filepath, { headers: true, skipRows: skip, maxRows: max })
    .on('error', error => console.error(error))
    .on('headers', () => console.time())
    .on('data', (row) => onRead(row))
    .on('end', rowCount => {
      console.log(`${dataLabel} loaded in:`);
      console.timeEnd();
    });

  return null;
};

// LOAD QUESTIONS
const questionPath = '../csvs/questions.csv';
const questionOnRead = (row) => {
  // user data to get or save
  const user = {
    name: row['asker_name'],
    email: row['asker_email']
  };

  // create a new user if needed
  User.findOrCreate({
    where: user,
    defaults: user
  })
    .then((result) => {
      Question.create({
        'question_id': row['id'],
        'product_id': row['product_id'],
        'body': row['body'],
        'date_written': row['date_written'],
        'reported': row['reported'],
        'helpful': row['helpful'],
        'user_id': result[0].id,
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });

  return null;
};

// load questions
load(0, 250000, questionPath, questionOnRead, 'questions');

// LOAD ANSWERS
const answerPath = '../csvs/answers.csv';

// LOAD ANSWERS PHOTOS
const answerPhotosPath = '../csvs/answers_photos.csv';