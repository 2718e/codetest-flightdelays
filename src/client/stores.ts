import { observable, IObservableValue } from 'mobx'
import { ObservableValue } from 'mobx/lib/types/observablevalue'
import { getAirports } from './api'

export class DataCache {

  airports: IObservableValue<string[]>

  constructor() {
    this.airports = observable.box([] as string[], {deep: false})
  }

  async refresh(){
    this.airports.set(await getAirports())
  }

}