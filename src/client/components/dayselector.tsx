import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { changeHandler, nameOfDay } from '../clienthelpers'
import * as React from 'react'

interface IDayOption {
  name: string,
  code: number
}

export interface IDaySelectorProps {
  state: DaySelectorState
}

const dayOptions = [{ name: "All", code: -1 }]
  .concat(new Array(7).fill(0).map((unused, i) => {
    return {
      code: i,
      // momentjs doesnt import well - have to use .default or get a moment is not a function error,
      // but the type definition doesnt recognise this.
      name: nameOfDay(i)
    }
  })
  )

export class DaySelectorState {

  selectedDay = observable.box(dayOptions[0], {deep: false})

  handleChange = (event: any) => {
    const val = Number(event.target.value)
    const nextSelection = dayOptions.find(opt => opt.code === val)
    this.selectedDay.set(nextSelection)
  }

}

export const DaySelector = observer((props: IDaySelectorProps) => {
  return <div>
    <div className="form-label" >Day of Week (for hourly charts)</div>
    <select className="form-select" value={props.state.selectedDay.get().code} onChange={props.state.handleChange}>
      {dayOptions.map(dayData => <option key={dayData.code} value={dayData.code} >{dayData.name}</option>)}
    </select>
  </div>
})