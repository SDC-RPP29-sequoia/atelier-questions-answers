const { DataTypes } = require('sequelize');
const { sequelize } = require('../index.js');

// ATTRIBUTES
const attributes = {
  'id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'question_id': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'product_id': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'body': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'date_written': {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  'reported': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'helpful': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'user_id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_info',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }
};

// MODEL
const Question = sequelize.define('question', attributes, { timestamps: false });

module.exports = {
  Question: Question,
  QuestionAttributes: attributes
};