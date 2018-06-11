import * as React from 'react'
import { observer } from 'mobx-react'
import { IChartData } from '../api'
import { nameOfDay, format24Hour } from '../clienthelpers'
import { Bar } from 'react-chartjs-2'
import { merge } from 'lodash'

export interface IChartShowerProps {
  fGetStats: () => IChartData
}

const barColor = '#007FFF88'
const barBorderColor = '#007FFFDD'

function formatDayStats(dayStats: any) {
  const dayNumbers = new Array(7).fill(0).map((unused, i) => i)
  const data = []
  dayStats.forEach(dayData => {
    if (dayData.nDataPoints > 0) {
      data[dayData.key] = 100 * dayData.nDelayed / dayData.nDataPoints
    } else {
      data[dayData.key] = 0
    }
  })
  const result = {
    labels: dayNumbers.map(nameOfDay),
    datasets: [
      {
        label: "% flights delayed",
        data: dayNumbers.map(n => data[n] || 0),
        backgroundColor: barColor,
        borderColor: barBorderColor
      }
    ]
  }
  return result
}

function formatHourlyStats(hourStats: any) {
  const hours = hourStats.map(hourData => format24Hour(Number(hourData.key), 0))
  const data = hourStats.map(hourData => {
    if (hourData.nDataPoints > 0) {
      return 100 * hourData.nDelayed / hourData.nDataPoints
    }
    return 0
  })
  const result = {
    labels: hours,
    datasets: [
      {
        label: "% flights delayed",
        data: data,
        backgroundColor: barColor,
        borderColor: barBorderColor
      }
    ]
  }
  return result
}

// options for both charts
const chartOptions = {
  title: {
    display: true,
    fontSize: 16
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      scaleLabel: { display: true, labelString: "% delayed (> 1 minute)" }
    }]
  }
}

// additional options for the day chart
const dayChartOptions = {
  title: {
    text: 'Delayed flights by day'
  },
  scales: {
    xAxes: [{
      scaleLabel: { display: true, labelString: "Day of week" }
    }]
  }
}

// additional options for the hour chart
const hourChartOptions = {
  title: {
    text: 'Delayed flights by hour'
  },
  scales: {
    xAxes: [{
      scaleLabel: { display: true, labelString: "Hour of day (24hr time)" }
    }]
  }
}


export const ChartShower = observer((props: IChartShowerProps) => {
  const stats = props.fGetStats()
  const thingsToShow = []
  if (stats.error) {
    thingsToShow.push(<div key="errors" >{stats.error}</div>)
  }
  if (stats.statsByDay) {
    const formattedData = formatDayStats(stats.statsByDay)
    const opts = merge({}, chartOptions, dayChartOptions)
    thingsToShow.push(<div className="col-xl-12 col-6" key="daychart">
      <Bar data={formattedData} options={opts} />
    </div>)
  }
  if (stats.statsByHour) {
    const formattedData = formatHourlyStats(stats.statsByHour)
    const opts = merge({}, chartOptions, hourChartOptions)
    thingsToShow.push(<div className="col-xl-12 col-6" key="hourchart">
      <Bar data={formattedData} options={opts} />
    </div>)
  }
  return <div className="chart-shower">
    <div className="container">
      <div className="columns">
        {thingsToShow}
      </div>
    </div>
  </div>


})