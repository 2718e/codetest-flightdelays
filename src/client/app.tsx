import * as React from 'react' // need to import * as React rather than import React otherwise parcel renames it - which then breaks when the jsx is transformed assuming the name is React
import ReactDOM from 'react-dom'
import { DataCache } from './stores'
import { FilterControls, FilterControlsState } from './components/filtercontrols'
import { observer } from 'mobx-react'
import { autorun } from 'mobx'
import { postFetch } from './clienthelpers'
import { ChartShower } from './components/chartshower';
import { DummyNav } from './components/topbar';

const data = new DataCache()
const filterState = new FilterControlsState()
autorun(() => data.refreshChartData(filterState.filterSet.get()))

const AppRoot = observer(() => <div>
  <DummyNav />
  <div className="root-container" >
    <h3>Flight delay avoider</h3>
    <p>This tool allows you to select a source and a destination airport, and see what percentage of flights between those 2 airports were delayed by more than 1 minute</p>
    <FilterControls store={data} state={filterState} />
    <ChartShower fGetStats={() => data.chartData.get()} />
  </div>
</div>)

ReactDOM.render(
  <AppRoot />,
  document.getElementById('react-mount-point')
);

data.refresh()