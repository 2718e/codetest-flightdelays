const parse = require('csv-parse')
const fs = require('fs')
const moment = require('moment')
const _ = require('lodash')

class DataRecord {

  constructor(csvRow) {
    this.flightDate = moment(csvRow[0] + " " + csvRow[3], "YYYY-MM-DD HHmm")
    this.origin = csvRow[1]
    this.destination = csvRow[2]
    this.arrivalDelay = Number(csvRow[5])
    this.crsElapsedTime = Number(csvRow[6])
    this.distanceMiles = Number(csvRow[7])
  }

}

class DataProvider {

  constructor() {
    this.records = []
    this.airports = []
  }

  async load(pathToCsvFile) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(pathToCsvFile)
        .pipe(parse({ delimiter: ',' }))
        .on('data', (csvrow) => {
          if (csvrow[0] !== "FL_DATE") {
            this.records.push(new DataRecord(csvrow))
          }
        })
        .on('end', () => {
          this.airports = this.computeAirportsList()
          resolve()
        })
    })
  }

  getRow(index) {
    return this.records[index]
  }

  getAllAirports() {
    return this.airports
  }

  computeStatsForGroups(grouping, allowedDelay) {
    return _.map(grouping, (group, key) => {
      const numDelays = group.filter(record => record.arrivalDelay > allowedDelay).length
      return { key: key, nDelayed: numDelays, nDataPoints: group.length }
    })
  }

  getStatsFor(origin, dest, day, allowedDelay) {
    const relevant = this.records.filter(r => r.origin === origin && r.destination === dest)
    if (relevant.length === 0) {
      return {
        statsByDay: "No data",
        statsByHour: "No data"
      }
    }
    const byDay = _.groupBy(relevant, record => record.flightDate.day())
    const statsByDay = this.computeStatsForGroups(byDay, allowedDelay)
    // if day is -1 want have all days, otherwise limit to the selected day for hourly chart
    const datasetForByHour = day < 0 ? relevant : relevant.filter(record => record.flightDate.day() === day)
    const byHour = _.groupBy(datasetForByHour, record => record.flightDate.hour())
    const statsByHour = this.computeStatsForGroups(byHour, allowedDelay)
    return {
      statsByDay: statsByDay,
      statsByHour: statsByHour
    }
  }

  computeAirportsList() {
    const arrDepConcat = this.records.map(r => r.origin).concat(this.records.map(r => r.destination))
    return Array.from(new Set(arrDepConcat)).sort() // convert to set to get unique values
  }

}

module.exports = DataProvider