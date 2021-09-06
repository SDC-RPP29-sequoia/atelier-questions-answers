const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc');

// SCHEMAS
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

const productSchema = new mongoose.Schema({
  _id: Number,
  questions: [questionSchema]
});

// MODELS
const Product = mongoose.model('product', productSchema);

// METHODS
module.exports.addQuestion = () => {

};

module.exports.addAnswer = () => {

};

module.exports.reportQuestion = () => {

};

module.exports.reportAnswer = () => {

};

module.exports.markQuestionHelpful = () => {

};

module.exports.markAnswerHelpful = () => {

};

module.exports.getQuestionsAndAnswers = () => {

};

//////////////////
// ETL SPECIFIC //
//////////////////

module.exports.importRecords = (records) => {
  Product.insertMany(records);
};