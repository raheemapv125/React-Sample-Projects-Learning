import { useEffect , useState} from "react";
export function useFetch (fetchFn , initialData) {
    const [isFetching , setIsFetching] = useState(false)
    const [error , setError] = useState()
    const [fetchedData , setFetchedData] = useState(initialData)
    useEffect(() => {
        console.log('using custom hooks ..')
        async function fetchData () {
          setIsFetching(true)
          try{
            const places = await fetchFn()
            setFetchedData(places)
    
          }catch(error){
            setError({message : error.message || 'Failed to fetch User places...'})
          }
          setIsFetching(false)
        }
        fetchData()
      } , [fetchFn])

      return {
        isFetching ,
        fetchedData ,
        setFetchedData ,
        error
      }
}