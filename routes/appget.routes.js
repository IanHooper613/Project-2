
//
// This module provides a set of routes for sending users the various
// HTML pages for the frontend client app.
// *********************************************************************************

// Dependencies
// =============================================================
const path = require('path')
const router = require('express').Router()
const db = require('../models')

// Routes
// =============================================================

// The route for creating blob Items
router.get('/grocery', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/grocery.html'))
})

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// The route for viewing the product Items
router.get('/products', async function (req, res) {
  const products = await db.Product.findAll().map(product => product.toJSON())
  res.render('products', { products: products })
})

// The route for managing farmers
router.get('/farmers', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/farmer-manager.html'))
})

router.post('/api/products', async function (req, res) {
  try {
    const products = await db.Product.findAll()
    res.json({ data: products })
  } catch (error) {
    res.status(500).json(error)
  }
})

// The index route redirects to /product route
router.get('/', (req, res) => res.redirect('/products'))

module.exports = router
