const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require ('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))

// All the routes after need authentication

routes.use(authMiddleware)

/**
 *  Product
*/

routes.get('/products', handle(controllers.ProductController.index))

module.exports = routes