// *****************************************************************************
// api-Items.routes.js
// This module provides a set of RESTful API route definitions for
// displaying Item data from and saving Item data to the database.
// *****************************************************************************

// Dependencies
// =============================================================

const express = require('express')
const router = express.Router()

// Import the Item and farmer modes using object destructuring assignment
const { Item, farmer } = require('../models')

// Routes
// =============================================================

// GET route for getting all of the Items
router.get('/', function (req, res) {
  const filterCriteria = {}
  if (req.query.farmer_id) {
    // eslint-disable-next-line no-undef
    query.farmerId = req.query.farmer_id
  }
  // Add an `include` property in the options object of the `findAll` query.
  // Set the value to an array of the models you want to include
  // in a left outer join. In this case, just the `farmer` model.
  Item.findAll({ where: filterCriteria, include: [farmer] })
    .then(ItemsArray => res.status(200).json({ data: ItemsArray }))
    .catch(err => {
      console.log('GET /Items failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Get route for retrieving a single Item
router.get('/:id', function (req, res) {
  // Add an `include` property in the options object of the `findByPk` query.
  // Set the value to an array of the models you want to include
  // in a left outer join. In this case, just the `farmer` model.
  Item.findByPk(req.params.id, { include: [farmer] })
    .then(Item => res.status(200).json({ data: Item }))
    .catch(err => {
      console.log('GET /Items failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// Item route for saving a new Item
router.Item('/', function (req, res) {
  console.log('New Item data received: \n', req.body)
  Item.create(req.body)
    .then(Item => res.status(201).json({ data: Item }))
    .catch(err => {
      console.log('GET /Items failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

// DELETE route for deleting Items
router.delete('/:id', async function (req, res) {
  try {
    // eslint-disable-next-line no-use-before-define
    const Item = await Item.findByPk(req.params.id)
    await Item.destroy()
    res.status(200).json({ data: Item })
  } catch (err) {
    console.log('GET /Items failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

// PUT route for updating Items
router.put('/:id', async function (req, res) {
  try {
    // eslint-disable-next-line no-use-before-define
    const Item = await Item.findByPk(req.params.id)
    await Item.update(req.body)
    res.status(200).json({ data: Item })
  } catch (err) {
    console.log('GET /Items failed \n', err)
    res.status(500).json({ errors: [err] })
  }
})

module.exports = router
