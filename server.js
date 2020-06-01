const express = require('express')
const path = require('path')
// to use handlebars
const handlebars = require('express-handlebars')
// contains routes that are used and loads routes under grocery_controller.js
// const groceryroutes = require('./routes/grocery.routes.js')
const routes = require('./routes/routes')

const db = require('./models')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// Static Files
app.use('/', express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', routes)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
