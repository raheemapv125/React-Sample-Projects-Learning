import useHttp from "../hooks/usehttp.js"
import MealItem from './meal-item.jsx'
import Error from "./error.jsx"

const configData = {}
export default function Meals () {

    const {data : loadedMeals , isLoading , error} = useHttp(
            'http://localhost:3000/meals'  , configData , [])

    if(isLoading) {
        return <p className="center">Meals are Fetching...</p>
    }
    if(error) {
        return <Error title = "Failed to Fetch Mealss"
            message = {error} />
    }

    return (
        <ul id = "meals">
            {loadedMeals.map(meal => 
                <MealItem key = {meal.id} meal = {meal} />
                )}
            
        </ul>
    )
}