import express from 'express'
import countries from '../controllers/countries.js'
import memories from '../controllers/memories.js'
import trips from '../controllers/trips.js'
import auth from '../controllers/auth.js'
import users from '../controllers/users.js'
import { secureRoute } from '../lib/secureRoute.js'

const router = express.Router()

// Countries
router.route('/countries')
  .get(countries.index)

router.route('/countries/:countryId')
  .get(countries.show)

// Trips
router.route('/trips')
  .post(secureRoute , trips.create)
  .get(trips.index)

router.route('/trips/:tripId')
  .delete(secureRoute, trips.delete)
  .get(trips.show)
  .put(secureRoute, trips.edit)

// Memories 
router.route('/memories')
  .post(secureRoute, memories.create)
  .get(memories.index)

router.route('/memories/:memoryId')
  .delete(secureRoute, memories.delete)
  .get(memories.show)
  .put(secureRoute, memories.edit)

//Users
router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/profile/:userId')
  .get(users.display)
// requires handling admin permissions before enabling:
// .put(secureRoute, users.edit)

router.route('/profile')
  .get(secureRoute, users.display)
  .put(secureRoute, users.edit)

export default router