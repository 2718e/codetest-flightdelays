const express = require('express')
const {makeParcelBundler} = require ('./parcelsetup')


async function makeRouter () {
  const router = express.Router()
  const bundler = await makeParcelBundler()
  
  router.get('/test', async (req, res) => {
    const {from, to} = req.query
    res.send( {
      departure: from,
      arrival: to
    })
  })

  router.use('/',bundler.middleware())

  return router
}

module.exports = { makeRouter }
