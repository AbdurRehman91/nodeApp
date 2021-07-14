'use strict'
const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

const app = express()
app.use(bodyParser.json())

const port = '8010'
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100
})

app.set('port', port)

// Create HTTP server
const server = http.createServer(app)
app.use('/jobListing/', require(path.resolve('./controllers/listingController.js')))
app.use('/api/jobListing', limiter, require(path.resolve('./controllers/listingController.js')))

const db = require('./models')
db.sequelize.sync()

// Listen on provided port, on all network interfaces.
server.listen(port, function () {
  console.log('Node Server listening at %s', port)
})

module.exports = app
