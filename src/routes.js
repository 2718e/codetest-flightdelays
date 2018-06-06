const express = require('express')
const {makeParcelBundler} = require ('./parcelsetup')


async function makeRouter () {
  const router = express.Router()
  const bundler = await makeParcelBundler()
  
  router.get('/helloworld', (req, res) => {
    res.send('OMG HI!! :)')
  })

  router.use('/',bundler.middleware())

  return router
}

module.exports = { makeRouter }
