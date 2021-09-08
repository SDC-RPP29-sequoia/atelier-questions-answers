const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc');
import Product from './models/product.js';

// METHODS
const methods = {
  addQuestion: () => {

  },
  addAnswer: () => {

  },
  reportQuestion: () => {

  },
  reportAnswer: () => {

  },
  markQuestionHelpful: () => {

  },
  markAnswerHelpful: () => {

  },
  getQuestionsAndAnswers: () => {

  },
  // ETL ONLY
  importRecords: (records) => {
    Product.insertMany(records);
  }
};

export default methods;