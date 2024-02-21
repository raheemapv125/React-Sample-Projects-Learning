import { useRef, useState, useCallback } from 'react';
import {fetchUserPlaces, updateUserPlaces} from '../src/http.jsx'
import { useFetch } from './hooks/useFetch.js';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import Error from './components/error.jsx';

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces , setErrorUpdatingPlaces] = useState()
  const { isFetching ,
    fetchedData:userPlaces , 
    setFetchedData:setUserPlaces , 
    error} = useFetch(fetchUserPlaces , [])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      const message = await updateUserPlaces([selectedPlace , ...userPlaces])
      console.log(message)
    }catch(error){
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({message : error.message || 'Failed to Update user Places ...'})
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      const message = await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id))
      console.log(message)
    }catch(error){
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({message : error.message || 'Failed to remove user Places ...'})
    }

    setModalIsOpen(false);
  }, [userPlaces , setUserPlaces]);

  function handleError() {
    setErrorUpdatingPlaces(null)
  }

  return (
    <>
      <Modal open = {errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && 
          <Error 
          title = "An error has Ocuured"
          message={errorUpdatingPlaces.message}
          onConfirm={handleError}/>}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error title = "An error has Occured" message = {error.message}/>}
        {!error && 
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          loadingText="Fetching User places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        /> }

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
