import Places from './Places.jsx';
import Error from './error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import { fetchAvailablePlaces } from '../http.jsx';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces () {
  const places = await fetchAvailablePlaces()
  
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
      places ,
      position.coords.latitude ,
      position.coords.longitude
      )
      resolve(sortedPlaces)
    })

  })
}

export default function AvailablePlaces({ onSelectPlace }) {

  const { isFetching ,
    fetchedData:availablePlaces ,
    error} = useFetch(fetchSortedPlaces , [])

  if(error){
    return (
      <Error  title = "An error has occured" message = {error.message}/>
    )
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFetching}
      loadingText = "Fetching PLaces ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
