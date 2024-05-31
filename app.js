const express = reqiure ('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authJwt = require('./helpers/jwt')
const errorHandler = require('.helpers/error-handler')

const app = express()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))

app.use(authJwt())

app.use('public/uploads', express.static(__dirname + '/public/uploads'))

app.use(errorHandler)


// Setting up routes

const api = process.env.API_URL
const categoriesRoute = require('./routes/categories')
const productRoute = require('./routes/products')
const userRoute = require('./routes/user')
const orderRoute = require('./routes/orders')

// Use the routes

app.use(`${api}/products`, productRoute)
app.use(`${api}/categories`, categoriesRoute)
app.use(`${api}/user`, userRoute)
app.use(`${api}/orders`, orderRoute)