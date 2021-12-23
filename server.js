// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const DB_URI = process.env.MONGO_URI
const app = express()

// CONNECT TO DB
mongoose.connect(DB_URI, () => console.log(`\n***Connected to mongo: ${DB_URI}***\n`))

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// ROUTES
// base route
app.get('/', (_req, res) => {
  res.send('Welcome to an awesome App about Breads')
})

// Breads routes
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

// Bakers routes
const bakersController = require('./controllers/bakers_controller')
app.use('/bakers', bakersController)

// 404 Catch-All
app.get('*', (_req, res) => {
  res.send('404')
})

// Error Handler
const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

// export app
module.exports = app
