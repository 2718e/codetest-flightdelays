const express = require('express')
const routes = require('./src/routes')
const config = require('config')

const port = config.get('appSettings.port')

const app = express()

const flightDelayRouter = routes.makeRouter()
app.use('/', flightDelayRouter)

app.listen(port, () => {
  console.log('app listening on port ' + port)
})
