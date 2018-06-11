import * as React from 'react'
import { observer } from 'mobx-react'
import { IChartData } from '../api'
import { nameOfDay } from '../clienthelpers'
import { Bar } from 'react-chartjs-2'

export interface IChartShowerProps {
  fGetStats: () => IChartData
}

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
        backgroundColor: '#007FFF88',
        borderColor: '#007FFFDD'
      }
    ]
  }
  return result
}

function formatHourlyStats(hourStats: any) {
  const hours =  hourStats.map(hourData => hourData.key)
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
        backgroundColor: '#007FFF88',
        borderColor: '#007FFFDD'
      }
    ]
  }
  return result
}

const chartOptions = {
  title: {
    display: true,
    text: '% of flights delayed by more than 1 minute',
    fontSize: 16
  },
  legend: {
    display: false
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
    thingsToShow.push(<div className="col-xl-12 col-6" key="daychart">
      <Bar data={formattedData} options={chartOptions}/>
    </div>)
  }
  if (stats.statsByHour) {
    const formattedData = formatHourlyStats(stats.statsByHour)
    thingsToShow.push(<div className="col-xl-12 col-6" key="hourchart">
      <Bar data={formattedData} options={chartOptions}/>
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