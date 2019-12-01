require('dotenv').config()
const express = require('express');
const Youch = require('youch')
const validate = require('express-validation');
const cors = require('cors');

class App {

    constructor() {

        this.express = express()
        this.isDev = process.env.NODE_ENV =! 'production'

        this.middlewares()
        this.routes()
        this.exception()

    }

    middlewares() {

        this.express.use(express.json())
        this.express.use(cors())

    }

    routes () {

        this.express.use(require('./routes'))

    }

    exception() {

        this.express.use(async (err, req, res, next) => {

            if(err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            if(process.env.NODE_ENV != 'production')  {

                const youch = new Youch(err, req)

                return res.json(await youch.toJSON())

            }

            return res.status(err.status || 500).json({ error: 'Ìnternal Server Error' })

        })

    }

}

module.exports = new App().express