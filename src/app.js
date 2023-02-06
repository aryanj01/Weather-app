const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require ('postman-request')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index',{
        title : 'Weather',
        name : 'Aryan Jasra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Aryan Jasra'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help page',
        name : 'Aryan Jasra'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error : 'Please provide the address !'
        })
    geocode(req.query.address, (error, data = {}) => {
        if(error) return res.send({error})
        forecast(data, (e, d = {}) => {
            if(e) return res.send({e})
            res.send({
                temperature : d.temperature,
                precipitation : d.precip
            })
        })
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Aryan Jasra',
        errorMessage : 'Page not found'
    })
})
app.listen(3000, () => {
console.log('Server is up and running.')
})