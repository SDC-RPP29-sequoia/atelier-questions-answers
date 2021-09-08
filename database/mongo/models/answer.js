const mongoose = require('mongoose');

module.exports.answerSchema = new mongoose.Schema({
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