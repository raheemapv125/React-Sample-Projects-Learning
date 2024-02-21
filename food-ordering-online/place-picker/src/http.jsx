export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places')
    if(!response.ok) {
      throw new Error('Failed to fetch Places ...')
    }
    const data = await response.json()
    return data.places
}
export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places')
  if(!response.ok) {
    throw new Error('Failed to fetch Places ...')
  }
  const data = await response.json()
  return data.places
}
export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places' , {
    method : 'PUT' ,
    body : JSON.stringify({places}),
    headers : {
      'content-type' : 'application/json'
    }
  })
  if(!response.ok) {
    throw new Error('Failed to update Places ...')
  }
  const data = await response.json()
  return data.message
}