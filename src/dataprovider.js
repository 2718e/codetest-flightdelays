const parse = require('csv-parse')
const fs = require('fs')
const moment = require('moment')

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
        .on('end', () => resolve())
    })
  }

  getRow(index) {
    return this.records[index]
  }

  getAllAirports(){
    const arrDepConcat = this.records.map(r=>r.origin).concat(this.records.map(r=>r.destination))
    return Array.from(new Set(arrDepConcat)).sort() // convert to set to get unique values
  }

}

module.exports = DataProvider