import * as moment from 'moment'

export function changeHandler<T> (onNewValue: (newValue: T) => void) {
  return { onChange: event => onNewValue(event.target.value)}
}

export async function postFetch(url, payload) {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST', 
    body: JSON.stringify(payload)})
  return response.json()
}

export function nameOfDay(numberOfDay: number) {
  return (moment as any).default().day(numberOfDay).format("dddd")
}
