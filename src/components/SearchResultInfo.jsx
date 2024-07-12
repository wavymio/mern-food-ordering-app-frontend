import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SearchResultInfo = ({ total, city }) => {
    const navigate = useNavigate()

    const handleScrollToSearch = (event) => {
        event.preventDefault()
        navigate('/')
        setTimeout(() => {
            document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' });
        }, 100)
    }

    return (
        <div className='text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row'>
            <span>
                {total} Restaurants found in {city}
                <Link to="/#search" onClick={handleScrollToSearch} className='ml-1 text-sm font-semibold underline cursor-pointer text-blue-500'>Change Location</Link>
            </span>
        </div>
    )
}

export default SearchResultInfo
