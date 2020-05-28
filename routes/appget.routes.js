
//
// This module provides a set of routes for sending users the various
// HTML pages for the frontend client app.
// *********************************************************************************

// Dependencies
// =============================================================
const path = require('path')
const router = require('express').Router()
const db = require('../models')
const { Post } = require('../models')

// Routes
// =============================================================

// The route for the home page
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// The route for viewing all the farmers from the database
router.get('/farmers', async function (req, res) {
  const farmers = await db.Farmer.findAll().map(farmer => farmer.toJSON())
  res.render('farmers', { farmers: farmers })
})

// The route for viewing all the products from the database
router.get('/products', async function (req, res) {
  const products = await db.Product.findAll().map(product => product.toJSON())
  res.render('products', { products: products })
})

// Get route for returning all posts of a specific category
router.get('/products/Farmerid/:Farmerid', function (req, res) {
  Post.findAll({ where: { Farmerid: req.params.Farmerid } })
    .then(productsArray => res.status(200).json({ data: productsArray }))
    .catch(err => {
      console.log('GET /farmers failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

router.post('/api/productcreate', async function (req, res) {
  const productcreate = await db.Product.create()
  res.render('productcreate', { products: productcreate })
})
router.post('/posts', async function (req, res) {
  console.log('New post data received: \n', req.body)
  await db.Product.create(req.body)
    .then(post => res.status(201).json({ data: post }))
    .catch(err => {
      console.log('GET /posts failed \n', err)
      res.status(500).json({ errors: [err] })
    })
})

router.get('/posts', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/cms.html'))
})

// The index route redirects to /product route
router.get('/', (req, res) => res.redirect('/'))

module.exports = router
