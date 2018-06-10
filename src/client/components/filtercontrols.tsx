import { AirportSelector, AirportSelectorState } from './airportselector'
import { DaySelector, DaySelectorState } from './dayselector'
import { observer } from 'mobx-react'
import { computed, IComputedValue } from 'mobx'
import * as React from 'react'
import { DataCache } from '../stores'
import { IFilterOptions } from '../api';

export class FilterControlsState {

  originSelectorState: AirportSelectorState
  destinationSelectorState: AirportSelectorState
  daySelectorState: DaySelectorState

  constructor() {
    this.originSelectorState = new AirportSelectorState()
    this.destinationSelectorState = new AirportSelectorState()
    this.daySelectorState = new DaySelectorState()
  }

  filterSet : IComputedValue<IFilterOptions> = computed(() => {
    return {
      origin: this.originSelectorState.enteredText.get(),
      dest: this.destinationSelectorState.enteredText.get(),
      day: this.daySelectorState.selectedDay.get().code
    }
  })

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
      <div>
        <DaySelector state={props.state.daySelectorState} />
      </div>
    </div>
  </div>

})