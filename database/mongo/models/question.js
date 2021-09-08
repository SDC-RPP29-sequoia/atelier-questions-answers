const mongoose = require('mongoose');
const { answerSchema } = require('./answer.js');

module.exports.questionSchema = new mongoose.Schema({
  id: Number,
  productId: Number,
  body: String,
  dateWritten: Number,
  askerName: String,
  askerEmail: String,
  reported: Number,
  helpful: Number,
  answers: [answerSchema]
});