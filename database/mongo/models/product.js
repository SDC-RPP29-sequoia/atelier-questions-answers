const mongoose = require('mongoose');
import questionSchema from './question.js';

const productSchema = new mongoose.Schema({
  _id: Number,
  questions: [questionSchema]
});

const Product = mongoose.model('product', productSchema);

export default Product;