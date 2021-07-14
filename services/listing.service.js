'user strict'
const path = require('path')
const Q = require('q')
const db = require('../models')
const Listing = db.listing
const Op = db.Sequelize.Op

const service = {}
service.saveListingObj = saveListingObj
service.getListing = getListing
service.getTrendingJobs = getTrendingJobs
service.deleteJobListing = deleteJobListing
service.updateJobListing = updateJobListing

module.exports = service

const getPagination = (page, size) => {
  const limit = size ? +size : 10
  const offset = page ? page * limit : 0

  return { limit, offset }
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: listing } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, listing, totalPages, currentPage }
}

function getTrendingJobs (params, res) {
  const deferred = Q.defer()
  let { page, size } = params
  let { limit, offset } = getPagination(page, size)
  Listing.findAndCountAll({ where: { trending: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit)
      res.send(response)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving jobs listings.'
      })
    })
  return deferred.promise
}

function saveListingObj (params, res) {
  const deferred = Q.defer()
  const list = {
    jobTitle: params.title,
    company: params.company,
    location: params.location,
    postDate: params.postDate,
    applyEmail: params.applyEmail,
    leaveType: params.leaveType,
    trending: params.trending
  }

  Listing.create(list).then(data => {
    res.send('Object saved successfully')
  }).catch(err => {
    res.status(500).send({
      message:
      err.message || 'Some error occurred while creating the Listing object.'
    })
  })
  return deferred.promise
}

function getListing (id, res) {
  const deferred = Q.defer()
  if (id) {
    Listing.findByPk(id).then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: 'Error retrieving obj with id=' + id
      })
    })
  }
  else {
    Listing.findAll({ order: [['postDate']] }).then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: 'Error getting objects'
      })
    })
  }
  return deferred.promise
}

function deleteJobListing (id, res){
  const deferred = Q.defer()
  Listing.destroy({ where: {id} } ).then(data =>{
    res.status(204).send({
      message: 'Object deleted successfully'
    })
  }).catch(err => {
    res.status(500).send({
      message: 'Error getting objects'
    })
  });
  return deferred.promise
}


function updateJobListing (req, res){
  const deferred = Q.defer()
  id = req.params.id
  var selector = { 
    where: {id}
  }
  var dataValues = {
    jobTitle: req.body.title,
    company: req.body.company,
    location: req.body.location,
    postDate: req.body.postDate,
    applyEmail: req.body.applyEmail,
    leaveType: req.body.leaveType,
    trending: req.body.trending
  }
  Listing.update( dataValues, { where: { id: id } }).then(data =>{
    res.status(200).send({
     message: 'Object updated successfully'
    })
  }).catch(err => {
    res.status(500).send({
      message: 'Error getting objects'
    })
  })
  return deferred.promise
}