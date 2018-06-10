import { postFetch } from './clienthelpers'

export interface IFilterOptions {
  origin: string,
  dest: string,
  day: number
}

export interface IChartData {
  error? : string,
  statsByDay? : any,
  statsByHour? : any
}

export async function getAirports(): Promise<string[]> {
  const response = await fetch('./airports')
  return response.json()
}

export async function getStats(filterOptions: IFilterOptions): Promise<IChartData> {
  return await postFetch('./chartdata', filterOptions)
}