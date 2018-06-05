const express = require('express')

function makeRouter () {
  const router = express.Router()
  router.use(express.json())

  router.get('/helloworld', (req, res) => {
    res.send('OMG HI!! :)')
  })
  return router
}

module.exports = { makeRouter }
