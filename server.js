const express = require('express')
const session = require('express-session')
// const passport = require('./mypassport')
const path = require('path')
// to use handlebars
const handlebars = require('express-handlebars')
// contains routes that are used and loads routes under grocery_controller.js
// const groceryroutes = require('./routes/grocery.routes.js')
const appgetroutes = require('./routes/appget.routes')

const db = require('./models')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'something that should not be shared',
  resave: false,
  saveUninitialized: true
}))
// app.use(passport.initialize())
// app.use(passport.session())
app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// Static Files
app.use('/', express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', appgetroutes)
// app.use('/products', require('./routes/products'))
// app.use('/signin', require('./routes/signin'))
// app.use('/signup', require('./routes/signup'))
// app.use('/myaccount', require('./routes/myaccount'))
// app.use('/cart', require('./routes/cart'))

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

db.sequelize.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
