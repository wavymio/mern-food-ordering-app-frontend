import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

export const useSearchRestaurant = (city, searchState) => {
    const createSearchRequest = async () => {
        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())
        params.set("selectedCuisines", searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)

        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
    
        if (!response.ok) {
            throw new Error("Failed to get restaurant")
        }

        return response.json()
    }


    // To run the search query again once searchStatehas changed:
    // We use this ["searchRestaurants", searchState]
    const { data: results, isLoading } = useQuery(["searchRestaurants", searchState], createSearchRequest, {
        enabled: !!city
    })

    return {results, isLoading}
}

export const useGetRestaurant = (restaurantId) => {
    const getRestaurantByIdRequest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`)
        
        if (!response.ok) {
            throw new Error("Failed to get restaurant")
        }

        return response.json()
    }


    const {data: restaurant, isLoading} = useQuery("fetchRestaurant", getRestaurantByIdRequest, {
        enabled: !!restaurantId
    })

    return {restaurant, isLoading}
}