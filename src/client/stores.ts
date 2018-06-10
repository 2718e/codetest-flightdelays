import { observable, IObservableValue } from 'mobx'
import { ObservableValue } from 'mobx/lib/types/observablevalue'
import { getAirports, getStats, IFilterOptions, IChartData } from './api'

export class DataCache {

  airports: IObservableValue<string[]>
  chartData: IObservableValue<IChartData>

  constructor() {
    this.airports = observable.box([] as string[], { deep: false })
    this.chartData = observable.box({}, { deep: false })
  }

  async refresh() {
    this.airports.set(await getAirports())
  }

  async refreshChartData(filterOptions: IFilterOptions) {
    this.chartData.set(await getStats(filterOptions))
  }

}