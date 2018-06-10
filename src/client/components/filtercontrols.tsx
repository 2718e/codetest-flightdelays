import { AirportSelector, AirportSelectorState } from './airportselector'
import { observer } from 'mobx-react'
import * as React from 'react'
import { DataCache } from '../stores'

export class FilterControlsState {

  originSelectorState: AirportSelectorState
  destinationSelectorState: AirportSelectorState

  constructor() {
    this.originSelectorState = new AirportSelectorState()
    this.destinationSelectorState = new AirportSelectorState()
  }

}
export interface IFilterControlsProps {
  state: FilterControlsState
  store: DataCache
}

export const FilterControls = observer((props: IFilterControlsProps) => {
  return <div>
    <div className="filter-set">
      <div>
        <AirportSelector title="Depart from" fGetAirports={() => props.store.airports.get()} data={props.state.originSelectorState} />
      </div>
      <div>
        <AirportSelector title="Arrive at" fGetAirports={() => props.store.airports.get()} data={props.state.destinationSelectorState} />
      </div>
    </div>
  </div>

})