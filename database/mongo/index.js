const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc');
const { Product } = require('./models/product.js');
const { Question } = require('./models/question.js');
const { Answer } = require('./models/answer.js');

const filterOutReported = (doc) => {
  return doc.questions.filter(question => {
    question.answers = question.answers.filter(answer => {
      return answer.reported === 0;
    });
    return question.reported === 0;
  });
};

module.exports.getQuestionsAndAnswers = (productId, cb) => {
  Product.find({'_id': productId })
    .then(record => {
      cb(record[0]);
      // cb(filterOutReported(record[0]));
    });
};

module.exports.addQuestion = (productId, data) => {
  Product.collection.updateOne(
    { '_id': productId },
    { '$push': { 'questions': data } });
};

module.exports.addAnswer = (questionId, data) => {
  Product.collection.updateOne(
    { 'questions.id': questionId },
    { '$push': { 'questions.$.answers': data } });
};

module.exports.reportQuestion = (questionId) => {
  Product.collection.updateOne(
    { 'questions.id': questionId },
    { '$set': { 'questions.$.reported': 1 } });
};

module.exports.reportAnswer = (answerId) => {
  Product.collection.updateOne(
    { 'questions.answers.id': answerId },
    { '$set': { 'questions.$.answers.$[answer].reported': 1 } },
    { 'arrayFilters': [{ 'answer.id': answerId }] });
};

module.exports.markQuestionHelpful = (questionId) => {
  Product.collection.updateOne(
    { 'questions.id': questionId },
    { '$inc': { 'questions.$.helpful': 1 } });
};

module.exports.markAnswerHelpful = (answerId) => {
  Product.collection.updateOne(
    { 'questions.answers.id': answerId },
    { '$inc': { 'questions.$.answers.$[answer].helpful': 1 } },
    { 'arrayFilters': [{ 'answer.id': answerId }] });
};

// ETL ONLY
module.exports.uploadRecords = async (records) => {
  await Product.collection.insertMany(records);
};