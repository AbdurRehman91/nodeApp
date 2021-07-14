'use strict'
const path = require('path')
const express = require('express')
var listingService = require(path.resolve('services/listing.service'))
var router = new express.Router()

router.post('/', saveJobListing)
router.get('/:objId?', getJobListing)
router.get('/list/trending', getTrendingJobs)
router.delete('/:id', deleteJobListing)
router.put('/:id', updateJobListing)

module.exports = router

function saveJobListing (req, res) {
  listingService.saveListingObj(req.body, res).then(function (data) {
    res.send(data)
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

function getJobListing (req, res) {
  listingService.getListing(req.params.objId, res).then(function (data) {
    res.send(data)
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

function getTrendingJobs (req, res) {
  listingService.getTrendingJobs(req.query, res).then(function (data) {
    res.send(data)
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

function deleteJobListing (req,res){
	listingService.deleteJobListing(req.params.id, res).then(function (data) {
    res.send(data)
  }).catch(function (err) {
    res.status(400).send(err)
  })
}

function updateJobListing (req,res){
	listingService.updateJobListing(req, res).then(function (data) {
    res.send(data)
  }).catch(function (err) {
    res.status(400).send(err)
  })
}