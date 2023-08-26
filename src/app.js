const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

console.log(path.join(__dirname, '../public'))
console.log(__filename)

const app = express()

//Define paths for express config
const publicdirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//setup statis directory to serve
app.use(express.static(publicdirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Debasish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Debasish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Debasish'
    })
})
// const helpPage = path.join(publicdirectory,'/help')

// app.get('/help', (req, res) => {
//     res.send(
//         app.use(express.static(helpPage))
//     )
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            // console.log(location)
            // console.log('Forecast Data', forecastData)
            res.send([{
                location,
                forecastData,
                address: req.query.address
            }])
        })
    })
    // res.send([{
    //     location: 'khobar',
    //     temprate: '30 degree',
    //     address: req.query.address
    // }])
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page Not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})