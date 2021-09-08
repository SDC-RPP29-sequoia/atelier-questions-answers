const { QueryInterface } = require('sequelize');
const { sequelize } = require('../index.js');
const queryInterface = sequelize.getQueryInterface();

// postgre models
const { UserAttributes } = require('../models/user.js');
const { QuestionAttributes } = require('../models/question.js');
const { AnswerAttributes } = require('../models/answer.js');
const { AnswerPhotoAttributes } = require('../models/answerPhoto.js');
const { PhotoAttributes } = require('../models/photo.js');

// drop tables then create tables
queryInterface.dropTable('answer_photo')
  .then(() => queryInterface.dropTable('photo'))
  .then(() => queryInterface.dropTable('answer'))
  .then(() => queryInterface.dropTable('question'))
  .then(() => queryInterface.dropTable('user_info'))
  // create tables
  .then(() => queryInterface.createTable('user_info', UserAttributes))
  .then(() => queryInterface.createTable('question', QuestionAttributes))
  .then(() => queryInterface.createTable('answer', AnswerAttributes))
  .then(() => queryInterface.createTable('photo', PhotoAttributes))
  .then(() => queryInterface.createTable('answer_photo', AnswerPhotoAttributes));