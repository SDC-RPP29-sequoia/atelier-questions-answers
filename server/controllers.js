const mongoose = require('mongoose');
const dbURL = process.env.dbURL;
mongoose.connect(`mongodb://${dbURL}/sdc`);
const { Product } = require('./models/product.js');
const { Question } = require('./models/question.js');
const { Answer } = require('./models/answer.js');

module.exports.grabQuestions = (productId, cb) => {
  return Product.find({'_id': productId });
};

module.exports.grabAnswers = (questionId, cb) => {
  return Product.collection.find({ 'questions.id': questionId });
};

module.exports.addQuestion = (productId, data) => {
  return Product.collection.updateOne(
    { '_id': productId },
    { '$push': { 'questions': data } });
};

module.exports.addAnswer = (questionId, data) => {
  return Product.collection.updateOne(
    { 'questions.id': questionId },
    { '$push': { 'questions.$.answers': data } });
};

module.exports.reportQuestion = (questionId) => {
  return Product.collection.updateOne(
    { 'questions.id': questionId },
    { '$inc': { 'questions.$.reported': 1 } });
};

module.exports.reportAnswer = (answerId) => {
  return Product.collection.updateOne(
    { 'questions.answers.id': answerId },
    { '$inc': { 'questions.$.answers.$[answer].reported': 1 } },
    { 'arrayFilters': [{ 'answer.id': answerId }] });
};

module.exports.markQuestionHelpful = (questionId) => {
  return Product.collection.updateOne(
    { 'questions.id': questionId },
    { '$inc': { 'questions.$.helpful': 1 } });
};

module.exports.markAnswerHelpful = (answerId) => {
  return Product.collection.updateOne(
    { 'questions.answers.id': answerId },
    { '$inc': { 'questions.$.answers.$[answer].helpful': 1 } },
    { 'arrayFilters': [{ 'answer.id': answerId }] });
};

// ETL ONLY
module.exports.uploadRecords = async (records) => {
  await Product.collection.insertMany(records);
};