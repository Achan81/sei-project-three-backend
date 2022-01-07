import express from 'express'

import { connectToDatabase } from './db/helpers.js'
import { port, routePrefix } from './config/environment.js'
import country from './models/country.js'

import logger from './lib/logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use('/', logger)
app.use(express.json())
app.use(routePrefix, router)
app.use(errorHandler)

app.get('/countries', async (req, res) => {
  const countries = await country.find()
  return res.status(200).json(countries)
})

async function startServer() {
  try {
    await connectToDatabase()
    console.log('🌍 database has connected')
    app.listen(port, () => console.log(`Up and running on port ${port}`) )
  } catch (err) {
    console.log('something went wrong', err)
  }
}

startServer()