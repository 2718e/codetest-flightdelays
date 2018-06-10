import * as React from 'react' // need to import * as... otherwise parcel renames it - which then breaks when the jsx is transformed assuming the name is React
import ReactDOM from 'react-dom'
import { DataCache } from './stores'
import { FilterControls, FilterControlsState } from './components/filtercontrols'
import { observer } from 'mobx-react'

const data = new DataCache()
const filterState = new FilterControlsState()

const AppRoot = observer( () => <div>
  <FilterControls store={data} state={filterState} />
</div>)

ReactDOM.render(
  <AppRoot />,
  document.getElementById('react-mount-point')
);

data.refresh()