const express = require('express')
const {makeParcelBundler} = require ('./parcelsetup')

async function makeRouter (dataProvider) {
  const router = express.Router()
  const bundler = await makeParcelBundler()
  router.use(express.json())

  const validateDataRequest = (requestBody) => {
    const airports = dataProvider.getAllAirports()
    const {origin, dest, day} = requestBody
    if (!airports.includes(origin)){
      return "Departure airport not found"
    }
    if (!airports.includes(dest)){
      return "Destination airport not found"
    }   
    if (day < -1 || day > 6){
      return "Invalid day setting"
    }
    return false
  }

  router.get('/test', async (req, res) => {
    const {from, to} = req.query
    res.send( {
      departure: from,
      arrival: to
    })
  })

  router.post('/chartdata', async (req, res) => {
    let error = validateDataRequest(req.body)
    if (!error){
      const {origin, dest, day} = req.body
      const stats = dataProvider.getStatsFor(origin,dest,day,1)
      res.send(stats)
    } else {
      res.send({error: error})
    }
  })

  router.get('/airports', async (req,res) => {
    const result = dataProvider.getAllAirports()
    res.send(result)
  })

  router.use('/',bundler.middleware())

  return router
}

module.exports = { makeRouter }
