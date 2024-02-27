
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const User = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rollNo: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'USER'
  },
});

module.exports = User;
