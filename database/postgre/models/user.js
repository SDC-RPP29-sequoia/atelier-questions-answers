const { DataTypes } = require('sequelize');
const { sequelize } = require('../index.js');

// ATTRIBUTES
const attributes = {
  'id': {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  'name': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'email': {
    type: DataTypes.STRING,
    allowNull: false
  }
};

// MODEL
const User = sequelize.define('user_info', attributes, { timestamps: false });

module.exports = {
  User: User,
  UserAttributes: attributes
};