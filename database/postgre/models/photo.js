const { DataTypes } = require('sequelize');
const { sequelize } = require('../index.js');

// ATTRIBUTES
const attributes = {
  'id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'url': {
    type: DataTypes.STRING,
    allowNull: false
  }
};

// MODEL
const Photo = sequelize.define('photo', attributes, { timestamps: false });

module.exports = {
  Photo: Photo,
  PhotoAttributes: attributes
};