const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Juan Jimenez'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Juan Jimenez'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpFul text.',
    title: 'Help',
    name: 'Juan Jimenez'
  })
})

app.get('/weather', (req, res) => {
  const location = req.query.address

  if (!location) {
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(
    location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        })
      })
    }
  )
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Juan Jimenez',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Juan Jimenez',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
