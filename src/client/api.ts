export async function getAirports() : Promise<string[]> {

  const response = await fetch('./airports')
  return response.json()

}