import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { changeHandler } from '../clienthelpers'
import * as React from 'react'

export class AirportSelectorState {
  enteredText = observable.box("")
}

export interface AirportSelectorProps {
  fGetAirports: () => string[]
  data: AirportSelectorState
  title: string
}

const getSuggestions = (enteredText: string, airports: string[]) => {
  if (enteredText) {
    return airports.filter(airport => airport.charAt(0) === enteredText.toUpperCase().charAt(0)) // TODO check the whole string
  }
  return []
}

export const AirportSelector = observer((props: AirportSelectorProps) => {
  const text = props.data.enteredText;
  let suggestionList = null;
  const textLength = text.get().length
  if (textLength > 0 && textLength < 3) {
    const suggestions = getSuggestions(text.get(), props.fGetAirports())
    suggestionList = <div className="suggestions-anchor">
      <div className="suggestions-wrapper">
        {suggestions.map(suggestion => <div key={suggestion} onClick={() => text.set(suggestion)} >{suggestion}</div>)}
      </div>
    </div>
  }


  return <div className="airport-selector">
    <div>{props.title}</div>
    <input value={text.get()}
      {...changeHandler((s: string) => text.set(s))} />
    {suggestionList}
  </div>
})
