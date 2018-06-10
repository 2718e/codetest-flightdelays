export function changeHandler<T> (onNewValue: (newValue: T) => void) {
  return { onChange: event => onNewValue(event.target.value)}
}
