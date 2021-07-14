'use strict'
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('postgresql://postgres:123456@localhost/jobListing')

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
sequelize.options.logging = false

db.listing = require('./listing.model.js')(sequelize, Sequelize)

module.exports = db
