const mongoose = require('mongoose');
import answerSchema from './answer.js';

const questionSchema = new mongoose.Schema({
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

export default questionSchema;