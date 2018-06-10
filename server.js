const express = require('express')
const routes = require('./src/routes')
const config = require('config')
const DataProvider = require('./src/dataprovider')

const port = config.get('appSettings.port')

async function start() {

  const app = express()

  const filePath = './data/FlightDelays.csv'
  const data = new DataProvider()
  await data.load(filePath)
  const flightDelayRouter = await routes.makeRouter(data)
  app.use('/', flightDelayRouter)

  app.listen(port, () => {
    console.log('app listening on port ' + port)
  })
}

start()
