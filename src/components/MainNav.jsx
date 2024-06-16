import React from 'react'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import UsernameMenu from './UsernameMenu'

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    return (
        <span className='flex space-x-2'>
            {isAuthenticated ? (
                    <UsernameMenu />
                ) : (
                    <Button onClick={async () => await loginWithRedirect()} variant="ghost" className="font-bold hover:text-orange-500 hover:bg-white">
                        Log In
                    </Button>
                )
            }
        </span>
        
    )
}

export default MainNav
