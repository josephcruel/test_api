const express = reqiure ('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv/config')

const authJwt = require('./helpers/jwt')
const errorHandler = require('.helpers/error-handler')

const app = express()

app.use(cors())
app.options("*", cors())
app.use(morgan('tiny'))
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

// Database config and connection

const dbConfig = require('.config/database.config.js')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedToplogy: true,
    useFindAndModify: false
})

.then(() => {
    console.log("Successfully connnected to the database.")
}).catch(err => {
    console.log("Could not connect to the database. Exiting now ...", err)
    process.exit()
})

// Setting up the server
app.listen(() => {
    console.log("Server is running on port 3000")
})
