
//
// This module provides a set of routes for sending users the various
// HTML pages for the frontend client app.
// *********************************************************************************

// Dependencies
// =============================================================
const path = require('path')
const router = require('express').Router()

// Routes
// =============================================================

// The route for creating blob Items
router.get('/grocery', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/grocery.html'))
})

// The route for viewing the product Items
router.get('/products', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/indextest.html'))
})

// The route for managing farmers
router.get('/farmers', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/farmer-manager.html'))
})

// The index route redirects to /product route
router.get('/', (req, res) => res.redirect('/products'))

module.exports = router
