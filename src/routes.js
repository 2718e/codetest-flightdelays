const express = require('express')
const {makeParcelBundler} = require ('./parcelsetup')


async function makeRouter (dataProvider) {
  const router = express.Router()
  const bundler = await makeParcelBundler()
  
  router.get('/test', async (req, res) => {
    const {from, to} = req.query
    res.send( {
      departure: from,
      arrival: to
    })
  })

  router.get('/airports', async (req,res) => {
    const result = dataProvider.getAllAirports()
    res.send(result)
  })

  router.use('/',bundler.middleware())

  return router
}

module.exports = { makeRouter }
