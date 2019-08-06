const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chris Carnage'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chris Carnage'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Chris Carnage',
        helpText: 'Get some professional help.'
    })
})

app.get('/weather', (req, res) => {    
    if (!req.query.address) {
        return res.send({
            error: 'An address must be provided.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Carnage',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Carnage',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})