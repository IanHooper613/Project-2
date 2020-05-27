// *****************************************************************************
// api-farmers.routes.js
// This module provides a set of RESTful API route definitions for
// displaying farmer data from and saving farmer data to the database.
// *****************************************************************************

// Dependencies
// =============================================================

const { farmer, Item } = require('../models')
const router = require('express').Router()

// Routes
// =============================================================

// Find all farmers and return them to the user with res.json
router.get('/', function (req, res) {
  // Add an `include` property in the options object of the `findAll` query.
  // Set the value to an array of the models you want to include
  // in a left outer join. In this case, just the `Item` model.
  farmer.findAll({ include: [Item] })
    .then(farmersArray => res.status(200).json({ data: farmersArray }))
    .catch(err => {
      console.log('GET /Items failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Find one farmer with the id = req.params.id and return it with res.json
router.get('/:id', function (req, res) {
  // Add an `include` property in the options object of the `findByPk` query.
  // Set the value to an array of the models you want to include
  // in a left outer join. In this case, just the `Item` model.
  farmer.findByPk(req.params.id, { include: [Item] })
    .then(farmer => res.status(200).json({ data: farmer }))
    .catch(err => {
      console.log('GET /Items failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Create a new farmer with the data recieved in req.body
router.post('/', function (req, res) {
  farmer.create(req.body)
    .then(farmer => res.status(201).json({ data: farmer }))
    .catch(err => {
      console.log('GET /Items failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Delete the farmer with the id = req.params.id
router.delete('/:id', async function (req, res) {
  try {
    // eslint-disable-next-line no-use-before-define
    const farmer = await farmer.findByPk(req.params.id)
    await farmer.destroy()
    res.status(200).json({ data: farmer })
  } catch (err) {
    console.log('GET /Items failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
