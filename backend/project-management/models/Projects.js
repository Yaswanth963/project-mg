// project.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./Users');

const Project = sequelize.define("Projects", {
  projectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectDescription: {
    type: DataTypes.TEXT,
  },
  projectAssetUrl: {
    type: DataTypes.STRING,
  },
  projectAssetSize: {
    type: DataTypes.INTEGER,
  },
  dateOfSubmission: {
    type: DataTypes.STRING,
  },
  submittedBy: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "PENDING",
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    defaultValue: [],
  },
  // Define userId as a foreign key
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define association between User and Project
User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

module.exports = Project;
