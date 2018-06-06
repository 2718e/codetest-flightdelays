const express = require('express')
const routes = require('./src/routes')
const config = require('config')

const port = config.get('appSettings.port')

async function start () {


  const app = express()

  const flightDelayRouter = await routes.makeRouter()
  app.use('/', flightDelayRouter)

  app.listen(port, () => {
    console.log('app listening on port ' + port)
  })
}

start()
