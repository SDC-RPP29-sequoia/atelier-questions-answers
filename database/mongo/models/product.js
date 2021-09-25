const mongoose = require('mongoose');
const { questionSchema } = require('./question.js');

const productSchema = new mongoose.Schema({
  _id: Number,
  questions: [questionSchema]
});

module.exports.Product = mongoose.model('product', productSchema);