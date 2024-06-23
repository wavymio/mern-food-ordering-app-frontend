import SearchResultInfo from '../components/SearchResultInfo'
import { useSearchRestaurant } from '../api/RestaurantApi'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchResultCard from '../components/SearchResultCard'
import SearchBar from '../components/SearchBar'
import PaginationSelector from '../components/PaginationSelector'
import CuisineFilter from '../components/CuisineFilter'
import SortOptionDropdown from '../components/SortOptionDropdown'

const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })

    const [isExpanded, setIsExpanded] = useState(false)

    const { results, isLoading } = useSearchRestaurant(city, searchState)
    
    const setSortOption = (sortOption) => {
        setSearchState((prev) => ({
            ...prev,
            sortOption,
            page: 1
        }))
    }

    const setSelectedCuisines = (selectedCuisines) => {
        setSearchState((prev) => ({
            ...prev,
            selectedCuisines,
            page: 1
        }))
    }

    const setPage = (page) => {
        setSearchState((prev) => ({
            ...prev,
            page
        }))
    }

    const setSearchQuery = (searchFormData) => {
        setSearchState((prev) => ({
            ...prev,
            searchQuery: searchFormData.searchQuery,
            page: 1
        }))
    }

    const resetSearch = () => {
        setSearchState((prev) => ({
            ...prev,
            searchQuery: "",
            page: 1
        }))
    }

    if (isLoading) {
        return <span>Loading</span>
    }

    if (!results.data || !city) {
        return <span>No results found</span>
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div id='cuisines-list'>
                <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisines} isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prev) => !prev)} />
            </div>
            <div id='main-content' className='flex flex-col gap-5'>
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder={"Search by cuisine or restaurant name"} onReset={resetSearch} />
                <div className='flex justify-between flex-col gap-3 lg:flex-row'>
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
                {results.data.map((restaurant, index) => (
                    <SearchResultCard restaurant={restaurant} key={index} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
)
}

export default SearchPage
