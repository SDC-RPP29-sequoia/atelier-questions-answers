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
    allowNull: false,
    references: {
      model: 'answer',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },
  'photo_id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'photo',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }
};

// MODEL
const AnswerPhoto = sequelize.define('answer_photo', attributes, { timestamps: false });

// ATTRIBUTES
module.exports = {
  AnswerPhoto: AnswerPhoto,
  AnswerPhotoAttributes: attributes
};