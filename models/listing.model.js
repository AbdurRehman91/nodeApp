'use strict'
const { Sequelize, DataTypes } = require('sequelize')
module.exports = (sequelize, Sequelize) => {
  const listing = sequelize.define('listing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    jobTitle: {
      type: DataTypes.STRING
    },
    company: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    postDate: {
      type: DataTypes.DATE
    },
    applyEmail: {
      type: DataTypes.STRING
    },
    leaveType: {
      type: DataTypes.STRING
    },
    trending: { 
      type: DataTypes.BOOLEAN
    }
  },
  { 
    timestamps: false
  })
  return listing
}
