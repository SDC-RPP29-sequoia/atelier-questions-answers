const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  id: Number,
  questionId: Number,
  body: String,
  dateWritten: Number,
  answererName: String,
  answererEmail: String,
  reported: Number,
  helpful: Number,
  photos: [String],
});

module.exports.answerSchema = answerSchema;

module.exports.Answer = mongoose.model('answer', answerSchema);