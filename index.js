import express from 'express'

import { connectToDatabase } from './db/helpers.js'
import { port } from './config/environment.js'
import country from './models/country.js'

import router from './config/router.js'

const app = express()

app.use(express.json())
app.use(router)

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