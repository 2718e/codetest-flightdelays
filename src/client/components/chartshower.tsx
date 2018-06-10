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
        data: dayNumbers.map(n => data[n] || 0)
      }
    ]
  }
  return result
}

export const ChartShower = observer((props: IChartShowerProps) => {
  const stats = props.fGetStats()
  const thingsToShow = []
  if (stats.error) {
    thingsToShow.push(<div key="errors" >{stats.error}</div>)
  }
  if (stats.statsByDay) {
    const formattedData = formatDayStats(stats.statsByDay)
    thingsToShow.push(<div key="daychart">
      <Bar data={formattedData} width={600} height={250} />
    </div>)
  }
  return <div className="chart-shower">{thingsToShow}</div>


})