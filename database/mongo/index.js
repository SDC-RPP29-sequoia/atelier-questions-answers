const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc');
const { Product } = require('./models/product.js');

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
module.exports.getQuestionsAndAnswers = (id) => {
  Product.findById(id)
    .then((record) => {
      console.log(record);
    });
};
// ETL ONLY
module.exports.uploadRecords = async (records) => {
  await Product.collection.insertMany(records);
};