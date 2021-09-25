const { DataTypes } = require('sequelize');
const { sequelize } = require('../index.js');

// ATTRIBUTES
const attributes = {
  'id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'answer_id': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'question_id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'question',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
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
const Answer = sequelize.define('answer', attributes, { timestamps: false });

module.exports = {
  Answer: Answer,
  AnswerAttributes: attributes
};
