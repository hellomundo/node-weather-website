const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js') 
const forecast = require('./utils/forecast.js') 

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ed Ortega'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'There are lots of things you can do to fix the problem.',
        name: 'Ed Ortega'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ed Ortega'
    })
})

// Weather endpoint
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    console.log("sending address: "+req.query.address)
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        //console.log(error)
        console.log("got geocode data")
        if(error) {
            //console.log(error)
            return res.send({
                mode: "geocode",
                error: error
            })
        }
        //console.log(location)
        forecast(latitude, longitude, (ferror, fore) => {
            console.log("got weather data")
            if(ferror) {
                return res.send({
                    mode: 'forecast',
                    error: ferror
                })
            }
            return res.send({
                location: location,
                temperature: fore.temperature,
                wind_dir: fore.wind_dir,
                wind_speed: fore.wind_speed,
                description: fore.weather_descriptions[0],
                icon: fore.weather_icons[0]
            })
        })
    })
    //res.send({
    //    address: req.query.address
    //})
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'you must provide search term'
        })
    } else {
        console.log(req.query)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Not Found',
        name: 'Ed Ortega',
        message: 'Could not find that help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Ed Ortega',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})